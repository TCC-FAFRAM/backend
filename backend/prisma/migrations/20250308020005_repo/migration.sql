/*
  Warnings:

  - You are about to drop the column `role` on the `Usuario` table. All the data in the column will be lost.
  - The `tipo` column on the `Usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "role",
DROP COLUMN "tipo",
ADD COLUMN     "tipo" "Role" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "User";
