-- NAO ESTA PRONTO

-- funcao da trigger de log
CREATE OR REPLACE FUNCTION log_trigger() RETURNS TRIGGER AS $$
BEGIN
    -- Identificar a chave primária dinamicamente
    SELECT a.attname INTO chave_primaria
    FROM pg_index i
    JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
    WHERE i.indrelid = TG_RELID AND i.indisprimary LIMIT 1;

    -- Definir o ID do registro afetado
    IF TG_OP = 'DELETE' THEN
        EXECUTE format('SELECT ($1).%I', chave_primaria) USING OLD INTO id_registro_valor;
    ELSE
        EXECUTE format('SELECT ($1).%I', chave_primaria) USING NEW INTO id_registro_valor;
    END IF;

    -- Inserir no log
    INSERT INTO "Log" (tabela, operacao, id_registro, dados_antigos, dados_novos, data_registro)
    VALUES (
        TG_TABLE_NAME,
        TG_OP,
        id_registro_valor,
        CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN row_to_json(OLD) ELSE NULL END,
        CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) ELSE NULL END,
        NOW()
    );

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- triggers para as tabelas Usuario, Funcao e Curso
-- cria novas triggers e apaga as antigas se existir
DO $$ 
DECLARE r RECORD;
BEGIN
  FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' 
           AND tablename IN ('Usuario', 'Funcao', 'Curso') LOOP
    -- Removendo a trigger antiga, se existir
    EXECUTE format('DROP TRIGGER IF EXISTS log_trigger ON %I', r.tablename);
    
    -- Criando a nova trigger
    EXECUTE format(
      'CREATE TRIGGER log_trigger AFTER INSERT OR UPDATE OR DELETE ON %I 
       FOR EACH ROW EXECUTE FUNCTION log_trigger()', 
      r.tablename
    );
  END LOOP;
END $$;
