import { FormCard } from 'components'
export default function AboutApp() {
  return (
    <FormCard title="" description="">
      <div className="text-2xl pb-1 font-semibold">
        Qualificações e Certificados
      </div>
      <p className="mt-4">
        O serviço de autenticação, autorização e controle de acesso está
        qualificado pela HIPAA e é compatível com as certificações PCI DSS, SOC,
        ISO/IEC 27001, ISO/IEC 27017, ISO/IEC 27018 e ISO 9001.
      </p>

      <div className="mt-8 text-2xl pb-1 font-semibold">
        Criptografia de dados em repouso
      </div>
      <p className="mt-4">
        A criptografia em repouso aumenta a segurança de seus dados usando
        chaves de criptografia armazenadas na nuvem. Políticas organizacionais,
        regulamentações do setor ou do governo e requisitos de conformidade
        geralmente exigem o uso de criptografia em repouso para aumentar a
        segurança dos dados.
      </p>

      <div className="mt-8 text-2xl pb-1 font-semibold">Armanezamento</div>
      <p className="mt-4">
        Possui programas de conformidade como PCI-DSS, HIPAA/HITECH, FedRAMP, EU
        Data Protection Directive e FISMA para ajudar a cumprir requisitos
        normativos.{' '}
      </p>
    </FormCard>
  )
}
