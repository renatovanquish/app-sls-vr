import { useState } from 'react'
import { External } from 'components/icons'
import { Button, FormCard } from 'components/ui'

export default function Receipts(props: any) {
  const [loading, setLoading] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)

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

  return (
    <FormCard
      title="Resumo informativo dos Recebimentos"
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
            style={{ background: '#6A1B9A' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <rect fill="none" height="24" width="24" />
              <path
                fill="#ffffff"
                d="M11,14H9c0-4.97,4.03-9,9-9v2C14.13,7,11,10.13,11,14z M18,11V9c-2.76,0-5,2.24-5,5h2C15,12.34,16.34,11,18,11z M7,4 c0-1.11-0.89-2-2-2S3,2.89,3,4s0.89,2,2,2S7,5.11,7,4z M11.45,4.5h-2C9.21,5.92,7.99,7,6.5,7h-3C2.67,7,2,7.67,2,8.5V11h6V8.74 C9.86,8.15,11.25,6.51,11.45,4.5z M19,17c1.11,0,2-0.89,2-2s-0.89-2-2-2s-2,0.89-2,2S17.89,17,19,17z M20.5,18h-3 c-1.49,0-2.71-1.08-2.95-2.5h-2c0.2,2.01,1.59,3.65,3.45,4.24V22h6v-2.5C22,18.67,21.33,18,20.5,18z"
              />
            </svg>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-accent-9">
              Transações no Período
            </p>
            <p className="text-lg font-semibold text-accent-7">0</p>
          </div>
        </div>
      </div>

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
              Recebimentos no Período
            </p>
            <p className="text-lg font-semibold text-accent-7">R$ 0,00</p>
          </div>
        </div>
      </div>

      <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-accent-1">
        <div className="p-4 flex items-center">
          <div
            className="p-3 rounded-full mr-4"
            style={{ background: '#00B8D4' }}
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
                d="M14 2H4c-1.11 0-2 .9-2 2v10h2V4h10V2zm4 4H8c-1.11 0-2 .9-2 2v10h2V8h10V6zm2 4h-8c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2z"
              />
            </svg>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-accent-9">
              Transações Realizadas
            </p>
            <p className="text-lg font-semibold text-accent-7">0</p>
          </div>
        </div>
      </div>

      <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-accent-1">
        <div className="p-4 flex items-center">
          <div
            className="p-3 rounded-full mr-4"
            style={{ background: '#00BFA5' }}
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
                <path
                  fill="#ffffff"
                  d="M17,2H7C5.9,2,5,2.9,5,4v2c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V4C19,2.9,18.1,2,17,2z M17,6H7V4h10V6z M20,22H4 c-1.1,0-2-0.9-2-2v-1h20v1C22,21.1,21.1,22,20,22z M18.53,10.19C18.21,9.47,17.49,9,16.7,9H7.3c-0.79,0-1.51,0.47-1.83,1.19L2,18 h20L18.53,10.19z M9.5,16h-1C8.22,16,8,15.78,8,15.5C8,15.22,8.22,15,8.5,15h1c0.28,0,0.5,0.22,0.5,0.5C10,15.78,9.78,16,9.5,16z M9.5,14h-1C8.22,14,8,13.78,8,13.5C8,13.22,8.22,13,8.5,13h1c0.28,0,0.5,0.22,0.5,0.5C10,13.78,9.78,14,9.5,14z M9.5,12h-1 C8.22,12,8,11.78,8,11.5C8,11.22,8.22,11,8.5,11h1c0.28,0,0.5,0.22,0.5,0.5C10,11.78,9.78,12,9.5,12z M12.5,16h-1 c-0.28,0-0.5-0.22-0.5-0.5c0-0.28,0.22-0.5,0.5-0.5h1c0.28,0,0.5,0.22,0.5,0.5C13,15.78,12.78,16,12.5,16z M12.5,14h-1 c-0.28,0-0.5-0.22-0.5-0.5c0-0.28,0.22-0.5,0.5-0.5h1c0.28,0,0.5,0.22,0.5,0.5C13,13.78,12.78,14,12.5,14z M12.5,12h-1 c-0.28,0-0.5-0.22-0.5-0.5c0-0.28,0.22-0.5,0.5-0.5h1c0.28,0,0.5,0.22,0.5,0.5C13,11.78,12.78,12,12.5,12z M15.5,16h-1 c-0.28,0-0.5-0.22-0.5-0.5c0-0.28,0.22-0.5,0.5-0.5h1c0.28,0,0.5,0.22,0.5,0.5C16,15.78,15.78,16,15.5,16z M15.5,14h-1 c-0.28,0-0.5-0.22-0.5-0.5c0-0.28,0.22-0.5,0.5-0.5h1c0.28,0,0.5,0.22,0.5,0.5C16,13.78,15.78,14,15.5,14z M15.5,12h-1 c-0.28,0-0.5-0.22-0.5-0.5c0-0.28,0.22-0.5,0.5-0.5h1c0.28,0,0.5,0.22,0.5,0.5C16,11.78,15.78,12,15.5,12z"
                />
              </g>
            </svg>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-accent-9">
              Acumulado Recebido
            </p>
            <p className="text-lg font-semibold text-accent-7">R$ 0,00</p>
          </div>
        </div>
      </div>
    </div>
  )
}
