import dotenv from 'dotenv';
import { afterAll, beforeAll } from 'vitest';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Configuração global antes de todos os testes
beforeAll(async () => {
  // Aqui você pode adicionar configurações globais para os testes
  // Por exemplo, configurar um banco de dados de teste, limpar dados, etc.

});

// Limpeza global após todos os testes
afterAll(async () => {
  // Aqui você pode adicionar limpezas globais para os testes
  // Por exemplo, fechar conexões com o banco de dados, limpar dados, etc.

}); 