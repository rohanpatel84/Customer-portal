import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import SumbitLogo from '../../images/Button/Vector.png';
import CancelLogo from '../../images/Button/Vector2.png';
import deletLogo from '../../images/Button/Vector.svg';
import { API_URL } from '../../utils/helpers/API';

interface Props {
  username: string;
  password: string;
}

const Messages: React.FC<Props> = ({ username, password }) => {
  const navigate = useNavigate();
  const encodedCredentials = btoa(`${username}:${password}`);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  // const [uploadDocument, setuploadDocument] = useState();



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (files.length + selectedFiles.length > 3) {
        toast.error('You can upload a maximum of 3 files.');
        return;
      }
      setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    }
  };

  const handleFileDelete = (fileToDelete: File) => {
    setFiles(files.filter(file => file !== fileToDelete));
  };

  const clearFields = () => {
    setTitle('');
    setDescription('');
    setFiles([]);
  };

  const HandleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const storedUser = sessionStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : { username, password };

      const formdata = new FormData();
      formdata.append("username", user.username);
      formdata.append("password", user.password);
      formdata.append("_operation", "SaveRecord");
      formdata.append("module", "HelpDesk");
      formdata.append("mode", "all");
      formdata.append("values", JSON.stringify({
        ticketstatus: "Open",
        ticket_title: title,
        ticketpriorities: "High",
        description: description,
      }));

      // files.forEach(file => {
      //   formdata.append('filename', file.name);
      //   formdata.append('file', file);
      // });

      const requestOptions = {
        method: "POST",
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Basic ${encodedCredentials}`,
        },
        body: formdata,
      };

      const response = await fetch(API_URL, requestOptions);
      const jsonData = await response.json();
      console.log(jsonData);

      if (jsonData.success) {
        console.log(jsonData.result.record.id)
        formdata.append('parentId', jsonData.result.record.id);
        formdata.append("module", "Documents");
        formdata.append("values", JSON.stringify({
          notes_title: "testing",
        }));
        files.forEach(async file => {
          console.log( file.name , " this is name ")
          console.log( file)
          formdata.append('filename', file.name);
          formdata.append('file', file);
          const requestOptions = {
            method: "POST",
            headers: {
              'Access-Control-Allow-Origin': '*',
              Authorization: `Basic ${encodedCredentials}`,
            },
            body: formdata,
          };
    
          const response = await fetch('https://cms.excellcons.com/modules/CustomerPortal/api.php', requestOptions);
          const jsonDatas = await response.json();
          console.log(jsonDatas)
        });
      
      
        toast.success('Ticket created successfully!', { autoClose: 3000 });
        navigate("/Tickets");
      } else {
        toast.error('Failed to create ticket. Please try again later.', { autoClose: 3000 });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to create ticket. Please try again later.');
    }
  };


   // fetchDocument for docmuent api
  //  const fetchDocument = async () => {

  //   const formdata = new FormData();
  //   const storedUser = sessionStorage.getItem("user");
  //   if (storedUser) {
  //       const user = JSON.parse(storedUser);
  //       formdata.append("username", user.username);
  //       formdata.append("password", user.password);
  //   }
  //   formdata.append('_operation', 'SaveRecord');
  //   formdata.append('module', 'Documents');
  //   formdata.append('parentId', "17x1276");
  //   formdata.append('mode', 'all');
  //   formdata.append('values', JSON.stringify({
  //       notes_title: "test",
  //   }));

  //   files.forEach(file => {
  //     formdata.append('filename', file.name);
  //     formdata.append('file', file);
  //   });

  //   const requestOptions = {
  //       method: 'POST',
  //       headers: {
  //           'Access-Control-Allow-Origin': '*',
  //           Authorization: `Basic ${encodedCredentials}`,
  //       },
  //       body: formdata,
  //   };

  //   try {
  //       const response = await fetch('https://cms.excellcons.com/modules/CustomerPortal/api.php', requestOptions);
  //       const jsondata = await response.json();
  //       setuploadDocument(jsondata.result.record)
  //       // console.log(jsondata)
  //   } catch (error) {
  //       console.error('Error:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchDocument();
  // }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Messages" />
      <div className='flex justify-center'>
        <div className="p-6 col-span-12 rounded-2xl border border-stroke bg-white px-4 shadow-default xl:col-span-4 w-[40%]">
          <h4 className="text-xl font-bold text-[#D0662E] dark:text-white">Register Support Ticket</h4>
          <form onSubmit={HandleCreateTicket}>
            <div className='mt-2'>
              <label className='font-semibold text-[#353535]'>Issue</label>
              <input 
                type="text" 
                required
                placeholder="Enter Issue"
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className='border focus:border-[#9da4ae] active:border-[#44546F] border-stroke bg-white h-12 rounded-lg form-input dark:bg-zink-600/50 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 dark:text-slate-500 dark:text-zink-100 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200  appearance-none w-full py-2 px-3 text-[#686b78] leading-tight'
              />
            </div>
            <div className='mt-2'>
              <label className='font-semibold text-[#353535]'>Description</label>
              <textarea 
                placeholder="Enter Description" 
                required
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                className='border focus:border-[#9da4ae] active:border-[#44546F] border-stroke bg-white h-12 rounded-lg form-input dark:bg-zink-600/50 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 dark:text-slate-500 dark:text-zink-100 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200  appearance-none w-full py-2 px-3 text-[#686b78] leading-tight '
              />
            </div>
            <div className="flex flex-col mt-2">
              <label className="font-semibold text-[#353535]">Attach files (Max 3)</label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-white file:py-3 file:px-5 file:hover:bg-[#D0662E] file:hover:bg-opacity-10 focus:border-[#D0662E] active:border-[#D0662E] disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              />
              {files.length > 0 && (
                <div className="mt-2">
                  {files.map((file) => (
                    <div key={file.name} className="flex justify-between items-center border border-stroke bg-white w-full h-12 rounded-lg mt-1 p-3">
                      <span>{file.name}</span>
                      <button
                        type="button"
                        onClick={() => handleFileDelete(file)}
                        className="text-red-500"
                      >
                        <img src={deletLogo} alt="Delete" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className='flex gap-10 mt-4'>
              <button type="submit" className='w-35 h-10 rounded-lg bg-[#D0662E] flex text-center items-center justify-center gap-3'>
                <img src={SumbitLogo} alt="Submit" />
                <span className='text-white'>Submit</span>
              </button>
              <button type="button" className='w-35 h-10 border rounded-lg flex text-center items-center justify-center gap-3' onClick={() => { navigate("/tickets"); clearFields(); }}>
                <img src={CancelLogo} alt="Cancel" />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Messages;
