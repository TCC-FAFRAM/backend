import axios from 'axios';

export class DistritoService {
  async listarUFs() {
    const { data } = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    return data.map((estado: any) => ({
      label: estado.nome,
      value: estado.sigla
    }));
  }

  async listarMunicipiosPorUF(uf: string) {
    const { data } = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
    return data.map((municipio: any) => ({
      label: municipio.nome,
      value: municipio.id
    }));
  }

  async listarDistritosPorMunicipio(idMunicipio: string) {
    const { data } = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${idMunicipio}/distritos`);
    return data.map((distrito: any) => ({
      label: distrito.nome,
      value: distrito.id
    }));
  }
}
