import React, {useState} from 'react'
import {observer} from 'mobx-react-lite'
import cepPromise from 'cep-promise'
import {toast} from 'react-toastify'
import {Forms} from './styles'
import {cepMask} from '../../../shared/utils/cepMask'
import {useRootStore} from '../../../shared/infra/mobx'
import {UserAddress} from '../../../models/userAddressModel'

interface IAddress {
  bairro: string
  cep: string
  cidade: string
  complemento: string
  rua: string
  numero: string
}
const ChangeAddress: React.FC = observer(() => {
  const {layoutStore, currentUserStore} = useRootStore()
  const [onChangeFields, setChanged] = useState(false)
  const [address, setAddress] = useState<IAddress>(
    new UserAddress(currentUserStore.currentUser.address),
  )
  const [onBlurCep, setBlurCep] = useState(address.cep)

  const findCep = async (e: any) => {
    if (onBlurCep === address.cep) return
    const {value} = e.target
    const sleep = (m: any) => new Promise((r) => setTimeout(r, m))
    const valid = (val: string) => /^[0-9\b]+$/.test(val)
    if (!value || !valid(value.replace('-', '')) || value.length !== 9) return
    layoutStore.setCepSearching(true)
    layoutStore.setOverlay(true)
    await sleep(1000)
    cepPromise(value)
      .then((res) => {
        setAddress({
          ...address,
          bairro: res.neighborhood,
          rua: res.street,
          cidade: res.city,
        })
      })
      .catch((err) => {
        const messageErrors =
          err && err.errors
            ? err.errors.map((err: any) => err.message)
            : undefined
        const notFound = messageErrors.some((arr: any) =>
          [
            'CEP NAO ENCONTRADO',
            'CEP não encontrado na base do ViaCEP.',
          ].includes(arr),
        )
        let errMessage = notFound
          ? 'CEP inválido'
          : 'Algo deu errado tente mais tarde ou contate gabriel 😁 .'
        toast.error(errMessage)
      })
    setBlurCep(address.cep)
    layoutStore.setCepSearching(false)
    layoutStore.setOverlay(false)
  }
  return (
    <Forms buttonActive={onChangeFields}>
      <div className="form-item">
        <div className="form-name">
          <label>CEP</label>
        </div>
        <div className="form-input">
          <div className="wrap-input">
            <input
              type="tel"
              maxLength={9}
              value={address.cep}
              autoComplete="off"
              onChange={(e) => {
                setAddress({...address, cep: cepMask(e.target.value)})
                setChanged(true)
              }}
              onBlur={(ev) => findCep(ev)}
              required
              id="cep"
            />
          </div>
        </div>
      </div>
      <div className="form-item">
        <div className="form-name">
          <label>Cidade</label>
        </div>
        <div className="form-input">
          <div className="wrap-input">
            <input
              value={address.cidade}
              onChange={(e) => {
                setAddress({...address, cidade: e.target.value})
                setChanged(true)
              }}
              required
              autoComplete="off"
              id="cidade"
            />
          </div>
        </div>
      </div>
      <div className="form-item">
        <div className="form-name">
          <label>Rua</label>
        </div>
        <div className="form-input">
          <div className="wrap-input">
            <input
              value={address.rua}
              onChange={(e) => {
                setAddress({...address, rua: e.target.value})
                setChanged(true)
              }}
              required
              autoComplete="off"
              id="rua"
            />
          </div>
        </div>
      </div>
      <div className="form-item">
        <div className="form-name">
          <label>Bairro</label>
        </div>
        <div className="form-input">
          <div className="wrap-input">
            <input
              value={address.bairro}
              onChange={(e) => {
                setAddress({...address, bairro: e.target.value})
                setChanged(true)
              }}
              required
              autoComplete="off"
              id="bairro"
            />
          </div>
        </div>
      </div>
      <div className="form-item">
        <div className="form-name">
          <label>Número</label>
        </div>
        <div className="form-input">
          <div className="wrap-input">
            <input
              value={address.numero}
              onChange={(e) => {
                setAddress({...address, numero: e.target.value})
                setChanged(true)
              }}
              required
              autoComplete="off"
              id="numero"
            />
          </div>
        </div>
      </div>
      <div className="form-item">
        <div className="form-name">
          <label>Complemento</label>
        </div>
        <div className="form-input">
          <div className="wrap-input">
            <input
              value={address.complemento}
              onChange={(e) => {
                setAddress({...address, complemento: e.target.value})
                setChanged(true)
              }}
              required
              autoComplete="off"
              id="complemento"
            />
          </div>
        </div>
      </div>
      <div className="form-item subBut">
        <div className="form-name" />
        <div className="form-input">
          <div className="wrap-input">
            <button type="button">Alterar endereço</button>
          </div>
        </div>
      </div>
    </Forms>
  )
})

export default ChangeAddress
