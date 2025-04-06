import express from 'express';
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