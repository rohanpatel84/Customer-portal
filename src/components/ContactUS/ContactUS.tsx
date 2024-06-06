import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'

const ContactUS = () => {
  return (
    <DefaultLayout>
        <Breadcrumb pageName="ContactUS" />

        <div className='rounded-lg border border-stroke shadow-default w-fit m-auto'>
          <div className='m-4'>
            <h1 className='text-[#D0662E] font-bold'>Contact Us</h1>
          </div>
          <div className='m-4'>
            <h2 className='text-[#353535] font-semibold'>Address:</h2>
            <p>B 204 Ratnaakar Nine Square,Opp. Keshavbaug Party Plot,<br /> Mansi Circle, Road, Vastrapur, Ahmedabad, Gujarat 380015</p>
          </div>
          <div className='m-4'>
            <h2 className='text-[#353535] font-semibold'>Email:</h2>
            <p>info@xexcellence.com</p>
          </div>
          <div className='m-4'>
            <h2 className='text-[#353535] font-semibold'>Phone:</h2>
            <p>+91 81600 17115</p>
          </div>
        </div>
    </DefaultLayout>
  )
}

export default ContactUS;