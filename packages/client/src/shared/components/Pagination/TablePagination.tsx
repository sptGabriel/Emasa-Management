import React from 'react'
import {observer} from 'mobx-react-lite'
import {DepartamentMain, ResponsiveTable, TableContent} from './styles'
import CheckBox from '../../../shared/components/CheckBox'

const DepartamentPage: React.FC = observer(() => {
  return (
    <DepartamentMain>
      <h1>departament page </h1>
      <TableContent>
        <ResponsiveTable>
          <thead>
            <tr>
              <th className="paddingCheckbox">
                <span className="root">
                  <input type="checkbox" />
                </span>
              </th>
              <th>Nome</th>
              <th>Diretor</th>
              <th>Gerente</th>
              <th>Coordenador</th>
              <th>Criado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="paddingCheckbox">
                <span className="root">
                  <input type="checkbox" />
                </span>
              </td>
              <td>Ti</td>
              <td>Test</td>
              <td>Test</td>
              <td>Test</td>
              <td>Test</td>
            </tr>
            <tr>
              <td className="paddingCheckbox">
                <span className="root">
                  <input type="checkbox" />
                </span>
              </td>
              <td>Ti</td>
              <td>Test</td>
              <td>Test</td>
              <td>Test</td>
              <td>Test</td>
            </tr>
          </tbody>
        </ResponsiveTable>
      </TableContent>
    </DepartamentMain>
  )
})

export default DepartamentPage
