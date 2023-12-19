import ReceiptMethods from './ReceiptMethods'
import ReceiptResume from './ReceiptResume'

export default function Billing(props: any) {
  return (
    <>
      <ReceiptResume />
      <ReceiptMethods />
    </>
  )
}
