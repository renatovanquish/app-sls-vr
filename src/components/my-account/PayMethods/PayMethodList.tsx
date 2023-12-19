import { Edit, Trash } from 'components/icons'
import { PaymentMethods } from 'API'

export default function PayMethodList(props: any) {
  return props.payMethods && props.payMethods.length > 0 ? (
    <table className="table w-full">
      <tbody>
        {props.payMethods.map((payment: any, index: number) => (
          <tr key={index}>
            <td>
              <div className="font-semibold text-accent-9">{payment.label}</div>
              <div className="flex gap-1">
                {payment.brand && (
                  <div className="text-sm inline bg-slate-500 text-white px-1 rounded">
                    {payment.brand.toUpperCase()}
                  </div>
                )}
                {payment.method === PaymentMethods.CREDIT && (
                  <div className="text-sm inline bg-teal-500 text-white px-1 rounded">
                    CRÉDITO
                  </div>
                )}
                {payment.method === PaymentMethods.DEBIT && (
                  <div className="text-sm inline bg-rose-700 text-white px-1 rounded">
                    DÉBITO
                  </div>
                )}
                {payment.method === PaymentMethods.PIX && (
                  <div className="text-sm inline bg-fuchsia-600 text-white px-1 rounded">
                    Pagamento com PIX
                  </div>
                )} 
                {payment.method === 'PayOnDelivery' && (
                  <div className="text-sm inline bg-sky-600 text-white px-1 rounded">
                    Pagamento na Entrega
                  </div>
                )}
              </div>
            </td>
            <td>
              <div className="flex justify-end">
                {(payment.method !== PaymentMethods.PIX && payment.method !== PaymentMethods.ONDELIVERY) && (
                  <button
                    onClick={() => props.openModalPayMethodsForm(payment)}
                    className="z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                  >
                    <Edit />
                  </button>
                )}

                <button
                  onClick={() => props.openModalPayMethodsDelete(payment)}
                  className="ml-4 text-red-500 z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                >
                  <Trash />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <></>
  )
}
