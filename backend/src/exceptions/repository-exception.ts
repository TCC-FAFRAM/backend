import { Prisma } from '@prisma/client';

export class RepositoryException extends Error {
  public readonly statusCode: number;
  public readonly cause?: unknown;

  constructor(
    cause: unknown,
    defaultMessage = 'Erro na camada de repositório.',
    defaultStatus = 500
  ) {
    const { message, statusCode } = RepositoryException.parseError(cause, defaultMessage, defaultStatus);
    super(message);

    this.statusCode = statusCode;
    this.cause = cause;

    Object.setPrototypeOf(this, RepositoryException.prototype);
  }

  private static parseError(error: unknown, fallbackMessage: string, fallbackStatus: number): {
    message: string;
    statusCode: number;
  } {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          return { message: 'Valor duplicado. Campo único já existe.', statusCode: 409 };
        case 'P2003': {
            const tableName = error.meta?.field_name || 'relacionamento';
            return {
              message: `Relacionamento inválido com a tabela "${tableName}". Verifique as chaves estrangeiras.`,
              statusCode: 400,
            };
          }       
        case 'P2025':
          return { message: 'Registro não encontrado.', statusCode: 404 };
        default:
          return { message: `Erro conhecido do Prisma: ${error.message}`, statusCode: 500 };
      }
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
        const detail = error.message;
      
        // Regex para extrair o nome do argumento inválido (ex: `cpf`)
        const match = detail.match(/Argument [`'](\w+)[`']/);
        const field = match?.[1];
      
        const message = field
          ? `O campo "${field}" é inválido. Verifique os dados informados.`
          : 'Erro de validação de dados.';
      
        return {
          message: `${message}`,
          statusCode: 422,
        };
      }
      
    console.error(error);
    return { message: fallbackMessage, statusCode: fallbackStatus };
  }
}
