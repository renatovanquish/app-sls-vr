import { useState } from 'react'
import { External, Warning } from 'components/icons'
import { Button, FormCard } from 'components/ui'

const Buttons: React.FC = () => (
  <div>
    <Button variant="slim" type="button">
      <External className="h-7 w-7" />
      <span className="ml-2 font-semibold md:font-medium text-lg md:text-base">
        EXTRATO
      </span>
    </Button>
  </div>
)

export default function PaymentResume(props: any) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState()
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)

  return (
    <FormCard
      title="Resumo informativo dos Pagamentos"
      description=""
      buttons={<Buttons />}
    >
      <Resume />
    </FormCard>
  )
}

function Resume() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-accent-1">
        <div className="p-4 flex items-center">
          <div
            className="p-3 rounded-full mr-4"
            style={{ background: '#2E7D32' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                fill="#ffffff"
                d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
              />
            </svg>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-accent-9">
              Pagamentos Realizados
            </p>
            <p className="text-lg font-semibold text-accent-7">R$ 0,00</p>
          </div>
        </div>
      </div>

      <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-accent-1">
        <div className="p-4 flex items-center">
          <div
            className="p-3 rounded-full mr-4"
            style={{ background: '#0277BD' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                fill="#ffffff"
                d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"
              />
            </svg>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-accent-9">
              Pagamentos Recorrentes
            </p>
            <p className="text-lg font-semibold text-accent-7">R$ 0,00</p>
          </div>
        </div>
      </div>

      <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-accent-1">
        <div className="p-4 flex items-center">
          <div
            className="p-3 rounded-full mr-4"
            style={{ background: '#FF6D00' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                fill="#ffffff"
                d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"
              />
            </svg>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-accent-9">
              Proximo Pagamento
            </p>
            <p className="text-lg font-semibold text-accent-7">Nenhum</p>
          </div>
        </div>
      </div>

      <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-accent-1">
        <div className="p-4 flex items-center">
          <div
            className="p-3 rounded-full mr-4"
            style={{ background: '#D50000' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <g>
                <rect fill="none" height="24" width="24" />
              </g>
              <g>
                <g>
                  <g>
                    <path
                      fill="#ffffff"
                      d="M12,5.99L19.53,19H4.47L12,5.99 M12,2L1,21h22L12,2L12,2z"
                    />
                    <polygon fill="#ffffff" points="13,16 11,16 11,18 13,18" />
                    <polygon fill="#ffffff" points="13,10 11,10 11,15 13,15" />
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-accent-9">
              Pagamentos Pendentes
            </p>
            <p className="text-lg font-semibold text-accent-7">R$ 0,00</p>
          </div>
        </div>
      </div>
    </div>
  )
}
