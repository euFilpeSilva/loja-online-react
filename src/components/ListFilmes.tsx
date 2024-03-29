import { Heart, Star } from "phosphor-react";
import { useState } from 'react';
import ActionButton from "./ActionButton";
import GenreFilms from "./GenreFilms";
import Favoritos from "./MenuFavoritos";
import Sidebar from './Sidebar';

export type Film = {
  id: number,
  title: string,
  poster_path: string,
  vote_average: number,
  genre_ids: number[],
}

export type PopularFilms = {
  page: number,
  results: Film[],
  total_pages: number,
  total_results: number,
}

export type ListFilmesProps = {
  isOpen: boolean,
  addFilmesCart: (filme: Film) => void,
  isFavorite: boolean,
  filmes: Film[]
}


export default function ListFilmes(props: ListFilmesProps) {
  
  const [carrinho, setCarrinho] = useState<Film[]>([]);
  const [favorite, setFavorite] = useState<Film[]>([]);
 
  const image_path = "https://image.tmdb.org/t/p/w500"


  function addFilmesCart(filme: Film) {
    setCarrinho([...carrinho, filme]);
  }
  function addFilmeFavorite(filme: Film) {
    setFavorite([...favorite, filme]);
  }

  function removerFilmeCarrinho(filme: Film) {

    // Criando uma lista local para pesquisar o item que será removido
    let localLista = [...carrinho]
    let index = 0; // Cada vez que esta função é chamada, representa o índice do elemento atual da pesquisa

    // Percorrendo a lista local para encontrar qual dos filmes tem o id igual ao do que se pretende remover (parametro)
    localLista.forEach(item => {

      // Quando o id do item atual for igual ao do filme, remove o item na posição em index
      if (item.id == filme.id) {
        localLista.splice(index, 1);
      }

      index++; // Se nenhuma correspondência for encontrada, apenas incrementa o index
    });

    // Ao final do loop, atualiza a lista geral do carrinho com os itens após a remoção
    setCarrinho(localLista);

  }

  // Logica dos filmes favoritos
  function removerFilmeFavorito(filme: Film) {

    // Criando uma lista local para pesquisar o item que será removido
    let localLista = [...favorite]
    let index = 0; // Cada vez que esta função é chamada, representa o índice do elemento atual da pesquisa

    // Percorrendo a lista local para encontrar qual dos filmes tem o id igual ao do que se pretende remover (parametro)
    localLista.forEach(item => {

      // Quando o id do item atual for igual ao do filme, remove o item na posição em index
      if (item.id == filme.id) {
        localLista.splice(index, 1);
      }

      index++; // Se nenhuma correspondência for encontrada, apenas incrementa o index
    });

    // Ao final do loop, atualiza a lista geral do carrinho com os itens após a remoção
    setFavorite(localLista);

  }

  return (
    <div>
      <div className="text-white  text-4xl h-[5vw]  pt-[8vw]  pl-8 dark:bg-gray-800 ">
        {/* <div className="w-[100vw] h-[15vw] flex"><Carroussel/></div> */}
        <strong>Filmes populares</strong>
      </div>
      <div className="flex dark:bg-gray-800 pt-0">
        {/* ternarios contendo as logicas de adaptação da tela ao abrir e fechar os menus laterais */}
        <div className={props.isOpen ? "w-[75vw]  " : " transition-all duration-1000 " && props.isFavorite ? "w-[75vw]  " : " transition-all duration-1000 "}>
          <ul className=" flex flex-wrap  justify-center items-center ml-0 mr-[2vw] mt-24 ">
            {props.filmes.length === 0 && <p>Carregando...</p>}
            {props.filmes.length > 0 && props.filmes.map(filme => (
              <div key={filme.id} className="transform motion-safe:hover:scale-110 ... transition-all shadow-md">
                <div className="absolute pl-2 pr-2 pt-2 dark:bg-gray-900 rounded-full justify-center items-center z-40 right-0 transform motion-safe:hover:scale-110 ... transition-all shadow-md">
                  <ActionButton
                    icon={<div><Heart size={32} color="#ffffff" weight="fill" /></div>}
                    onTap={() => addFilmeFavorite(filme)}
                  />
                </div>
                <li key={filme.id} className="border-2 border-slate-600 rounded  m-4 flex flex-col w-60 dark:bg-gray-800 items-center">
                  <img key={filme.id} src={`${image_path}${filme.poster_path}`} className=" w-60 h-96" />
                  <strong className="p-1 pb-2 text-center leading-4  dark:bg-gray-800 pt-2 text-white">{filme.title}</strong>
                  <div className=" flex flex-col dark:bg-gray-800 pl-4 gap-1 text-sm items-center">
                    <div className="text-xs mb-2 mt-1 mr-4 flex gap-4">
                      <strong className="dark:bg-gray-800 text-sm pl-2 text-white">R$ 36,45</strong>
                    <div className="mr-4 flex gap-1 h-4 text-center text-gray-700 ">
                      <Star size={16} color="#ffffff" weight="fill" className=" text-white" />                    
                        <div className="text-white">
                         {filme.vote_average}
                        </div>
                      <GenreFilms film={filme} />
                    </div>
                    </div>
                  </div>
                  <div className=" md:text-lg mb-4 md:w-[12vw] bg-white hover:dark:bg-gray-400 text-dark:bg-gray-800 font-bold ml-4 mr-4 py-3 px-4 hover:border-gray-500 rounded text-center items-center flex justify-center">
                    <ActionButton
                      icon={<div className=" w-[14vw] ">Adicionar</div>}
                      onTap={() => { addFilmesCart(filme) }}
                    />
                  </div>
                </li>
              </div>
            )
            )}
          </ul>
        </div>
        {/*Quando o estado do isOpen muda, o Sidebar é exibido, O isOpen é recdebido atraves do ListFilms e é atualizado fora do ListFilms*/}
        <Sidebar isOpen={props.isOpen} carrinhoLista={carrinho} removerItemCarrinho={removerFilmeCarrinho} addFilmesCart={props.addFilmesCart} />
        <Favoritos isFavorite={props.isFavorite} favoriteLista={favorite} removerItemFavorito={removerFilmeFavorito} />
      </div>
    </div>
  )

}