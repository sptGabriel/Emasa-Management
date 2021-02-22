import React, {Dispatch, SetStateAction, useState} from 'react'
import {BiChevronDown} from 'react-icons/bi'
import {BsChevronDown} from 'react-icons/bs'
import {position} from 'styled-system'
import Modal from '../../../shared/components/Modal'

const NewDepartament: React.FC<{
  state: boolean
  toggle: any
  setState: any
}> = ({setState, state, toggle}) => {
  const [positions, setActive] = useState(false)
  return (
    <Modal
      isShowing={state}
      hide={toggle}
      hideWithOutSide={setState}
      width={400}
      tittle={'Adicionar novo departamento'}
    >
      <form>
        <div
          style={{background: '#f7fafc'}}
          className="flex px-5 py-5 flex-col"
        >
          <section className="flex w-full flex-col">
            <span className="font-medium text-sm mb-2">
              Nome do departamento
            </span>
            <input
              type="text"
              name="price"
              id="price"
              className="focus:border-indigo-500 border border-gray-300 block w-full px-5 py-2 sm:text-sm rounded-lg"
            />
          </section>
          <section className="flex flex-col w-full mt-8">
            <span className="font-medium text-sm mb-2">
              Sigla do departamento
            </span>
            <input
              type="text"
              name="price"
              id="price"
              className="focus:border-indigo-500 border border-gray-300 block w-full px-5 py-2 sm:text-sm rounded-lg"
            />
          </section>
          <div className="flex flex-col w-full mt-8">
            <button
              type="button"
              onClick={() => setActive(!positions)}
              className={`flex items-center cursor-pointer w-min ${
                positions ? 'mb-6' : 'mb-2'
              }`}
            >
              <span className="font-medium text-normal mr-2 whitespace-nowrap">
                Adicionar cargos do departamento
              </span>
              {positions ? (
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </button>
            {positions ? (
              <>
                <section className="flex w-full flex-col mb-5">
                  <span className="font-medium text-sm mb-2">
                    Diretor do departamento
                  </span>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="focus:border-indigo-500 border border-gray-300 block w-full px-5 py-2 sm:text-sm rounded-lg"
                  />
                </section>
                <section className="flex w-full flex-col mb-5">
                  <span className="font-medium text-sm mb-2">
                    Gerente do departamento
                  </span>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="focus:border-indigo-500 border border-gray-300 block w-full px-5 py-2 sm:text-sm rounded-lg"
                  />
                </section>
                <section className="flex w-full flex-col mb-5">
                  <span className="font-medium text-sm mb-2">
                    Coordenador do departamento
                  </span>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="focus:border-indigo-500 border border-gray-300 block w-full px-5 py-2 sm:text-sm rounded-lg"
                  />
                </section>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
        <footer
          style={{boxShadow: 'inset 0 1px #e3e8ee'}}
          className="flex-auto px-5 py-5 flex justify-end"
        >
          <button
            onClick={() => setState(false)}
            type="button"
            className="mr-2 bg-white hover:shadow text-black font-medium  py-1 px-3 rounded-xl inline-flex items-center mr-2 shadow-sm border-gray-300 border"
          >
            Cancelar
          </button>
          <button
            className="bg-blue-800 hover:shadow text-white font-medium py-1 px-3 rounded-xl inline-flex items-center shadow-md"
            type="button"
          >
            Adicionar departamento
          </button>
        </footer>
      </form>
    </Modal>
  )
}

export default NewDepartament
