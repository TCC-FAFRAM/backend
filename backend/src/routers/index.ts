import express from 'express';
import AulaRouter from './AulaRouter';
import AulasConcluidasRouter from './AulasConcluidasRouter';
import AuthRouter from './AuthRouter';
import CertificadoRouter from './CertificadoRouter';
import CursoRouter from './CursoRouter';
import CursosConcluidosRouter from './CursosConcluidosRouter';
import DitritoRouter from './DistritoRouter';
import FazendaRouter from './FazendaRouter';
import FuncaoCursoRouter from './FuncaoCursoRouter';
import FuncaoRouter from './FuncaoRouter';
import LiberacaoCursoRouter from './LiberacaoCursoRouter';
import ProvaRouter from './ProvaRouter';
import TentativasProvaRouter from './TentativasProvaRouter';
import UsuarioFuncaoRouter from './UsuarioFuncaoRouter';
import UsuarioRouter from './UsuarioRouter';

const route = express.Router();

router.use('/auth', AuthRouter);
router.use('/certificado', CertificadoRouter);
router.use('/curso', CursoRouter);
router.use('/aula', AulaRouter);
router.use('/cursosconcluidos', CursosConcluidosRouter);
router.use('/funcaocurso', FuncaoCursoRouter);
router.use('/funcao', FuncaoRouter);
router.use('/liberacaocurso', LiberacaoCursoRouter);
router.use('/prova', ProvaRouter);
router.use('/tentativasprova', TentativasProvaRouter);
router.use('/usuariofuncao', UsuarioFuncaoRouter);
router.use('/usuario', UsuarioRouter);
router.use('/localizacao', DitritoRouter);
route.use('/auth', AuthRouter);
route.use('/certificado', CertificadoRouter);
route.use('/curso', CursoRouter);
route.use('/cursosconcluidos', CursosConcluidosRouter);
route.use('/funcaocurso', FuncaoCursoRouter);
route.use('/funcao', FuncaoRouter);
route.use('/liberacaocurso', LiberacaoCursoRouter);
route.use('/prova', ProvaRouter);
route.use('/tentativasprova', TentativasProvaRouter);
route.use('/usuariofuncao', UsuarioFuncaoRouter);
route.use('/usuario', UsuarioRouter);
route.use('/localizacao', DitritoRouter);
route.use('/fazenda', FazendaRouter);
route.use('/aulasConcluidas', AulasConcluidasRouter);


export default route;  