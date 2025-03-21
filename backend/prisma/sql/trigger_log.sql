-- NAO ESTA PRONTO

-- funcao da trigger de log
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

-- triggers para as tabelas Usuario, Funcao e Curso
-- cria novas triggers e apaga as antigas se existir
DO $$ 
DECLARE r RECORD;
BEGIN
  FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename IN ('usuario', 'funcao', 'curso') LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS log_trigger ON "%s"', r.tablename);
    EXECUTE format(
      'CREATE TRIGGER log_trigger AFTER INSERT OR UPDATE OR DELETE ON "%s" FOR EACH ROW EXECUTE FUNCTION log_trigger()',
      r.tablename
    );
  END LOOP;
END $$;

