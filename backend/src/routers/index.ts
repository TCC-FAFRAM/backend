import express from 'express';
import AuthRouter from './AuthRouter';
import CertificadoRouter from './CertificadoRouter';
import CursoRouter from './CursoRouter';
import CursosConcluidosRouter from './CursosConcluidosRouter';
import FuncaoCursoRouter from './FuncaoCursoRouter';
import FuncaoRouter from './FuncaoRouter';
import LiberacaoCursoRouter from './LiberacaoCursoRouter';
import ProvaRouter from './ProvaRouter';
import TentativasProvaRouter from './TentativasProvaRouter';
import UsuarioFuncaoRouter from './UsuarioFuncaoRouter';
import UsuarioRouter from './UsuarioRouter';
import DitritoRouter from './DistritoRouter';

const router = express.Router();

router.use('/auth', AuthRouter);
router.use('/certificado', CertificadoRouter);
router.use('/curso', CursoRouter);
router.use('/cursosconcluidos', CursosConcluidosRouter);
router.use('/funcaocurso', FuncaoCursoRouter);
router.use('/funcao', FuncaoRouter);
router.use('/liberacaocurso', LiberacaoCursoRouter);
router.use('/prova', ProvaRouter);
router.use('/tentativasprova', TentativasProvaRouter);
router.use('/usuariofuncao', UsuarioFuncaoRouter);
router.use('/usuario', UsuarioRouter);
router.use('/localizacao', DitritoRouter);


export default router;  