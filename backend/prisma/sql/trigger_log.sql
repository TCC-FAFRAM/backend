-- Criar a função de log
CREATE OR REPLACE FUNCTION log_trigger() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "Log" (entidade, acao, dados_anteriores, dados_novos, data_acao)
  VALUES (
    TG_TABLE_NAME,
    TG_OP,
    row_to_json(OLD),
    row_to_json(NEW),
    now()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- cria triiger de log de usuario, funcao e curso
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
