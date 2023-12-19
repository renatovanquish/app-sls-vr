import { useBreakPoints } from 'hooks/useBreakPoints'
import { Edit, Trash, Info } from 'components/icons'

export default function AddressesList(props: any) {
  const { isSm, isMd } = useBreakPoints()

  return props.addresses && props.addresses.length > 0 ? (
    <table className="table w-full">
      <tbody>
        {props.addresses.map((adress: any, index: number) => (
          <tr key={index}>
            <td>
              <div className='whitespace-pre-line text-lg text-accent-9'>
              {adress.name && <div><div className="text-lg font-bold badge badge-accent">{adress.name}</div><br /></div>}
              {adress.street}
              {adress.number && <span>, {adress.number}</span>}
              {adress.complement && <span>, {adress.complement}</span>}
              {(isSm || isMd) && <br />}
              {!isSm && !isMd && <span>, </span>}
              {adress.zipcode}
              {adress.neighborhood && <span>, {adress.neighborhood}</span>}
              {adress.city && <span>, {adress.city}</span>}
              {adress.state && <span>, {adress.state}</span>}
              {adress.country && <span>, {adress.country}</span>}
              </div>
              {adress.reference && <div className="text-sm text-accent-6"><Info width={16} height={16} /> {adress.reference}</div>}

              {isSm && (
                <div className="mt-4 flex">
                  <button
                    onClick={() => props.openModalAdressForm(adress)}
                    className="z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                  >
                    <Edit />
                  </button>

                  <button
                    onClick={() => props.openModalAdressDelete(adress)}
                    className="ml-4 text-red-500 z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                  >
                    <Trash />
                  </button>
                </div>
              )}
            </td>
            {!isSm && (
              <td>
                <div className="flex flex-row-reverse">
                  <button
                    onClick={() => props.openModalAdressDelete(adress)}
                    className="text-red-500 z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                  >
                    <Trash />
                  </button>
                  <button
                    onClick={() => props.openModalAdressForm(adress)}
                    className="mr-4 z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                  >
                    <Edit />
                  </button>
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <></>
  )
}
