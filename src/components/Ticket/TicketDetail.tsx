import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import ChatsBox from '../ChatsBox/ChatsBox';
import { toast } from 'react-toastify';
import uploadFile from '../../images/logo/_File upload icon.svg';
import { API_URL } from '../../utils/helpers/API';
// import deletLogo from '../../images/Button/Vector.svg';

type TicketProps = {
    assigned_user_id: { value: string; label: string },
    ticket_no: string;
    id: string;
    description: string;
    createdtime: string;
    commentcontent: string;
    ticketpriorities: string
    ticketstatus: string;
    product_id: string;
    ticketseverities: string;
    ticketcategories: string;
    ticket_title: string;

}

type Uploadfileprops = {
    length: number;
    map(arg0: (value: any, index: any) => import("react/jsx-runtime").JSX.Element): React.ReactNode;
    notes_title: string;
    filename: string;
    imageattachmentids: string
    id: string;
}

interface Props {
    username: string;
    password: string;
    onRequestClose: () => void;
    onSubmit: () => Promise<void>;
    title: string;
}

const TicketDetail: React.FC<Props> = ({ username, password }) => {
    const { id } = useParams<{ id: string }>();
    const [ticket, setTicket] = useState<TicketProps | null>(null);
    const [uploadfile, setUploadfile] = useState<Uploadfileprops | null>(null);
    const encodedCredentials = btoa(`${username}:${password}`);
    const navigate = useNavigate();


    //FetchRecord for ticket details 
    const fetchTicket = async () => {
        if (!id) {
            console.error("Ticket ID is undefined");
            return;
        }

        const formdata = new FormData();

        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            formdata.append("username", user.username);
            formdata.append("password", user.password);
        }
        formdata.append("_operation", "FetchRecord");
        formdata.append("recordId", id);

        const requestOptions = {
            method: "POST",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Basic ${encodedCredentials}`,
            },
            body: formdata,
        };

        try {
            const response = await fetch(API_URL, requestOptions);
            if (!response.ok) {
                console.error("Failed to fetch ticket details:", response.statusText);
                return;
            }
            const data = await response.json();
            setTicket(data.result.record);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchTicket();
    }, [id]);

    // FetchRelatedRecords for docmuent api
    const fetchData = async () => {
        if (!id) {
            console.error("Ticket ID is undefined");
            return;
        }

        const formdata = new FormData();
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            formdata.append("username", user.username);
            formdata.append("password", user.password);
        }
        // console.log("second api", id)
        formdata.append('_operation', 'FetchRelatedRecords');
        formdata.append('module', 'HelpDesk');
        formdata.append('recordId', id);
        formdata.append('relatedModule', 'Documents');
        formdata.append('relatedModuleLabel', 'Documents');
        formdata.append('mode', 'mine');

        const requestOptions = {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: `Basic ${encodedCredentials}`,
            },
            body: formdata,
        };

        try {
            const response = await fetch(API_URL, requestOptions);
            const jsondata = await response.json();
            setUploadfile(jsondata.result.data)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleTicketClose = async () => {
        if (!id || !ticket) return;

        let action = '';

        // Check if the ticket is open or closed
        if (ticket.ticketstatus === 'Closed') {
            action = 're-opened';
        } else {
            action = 'closed';
        }

        // Ask for confirmation and reason
        const confirmation = window.confirm(`Are you sure you want to ${action === 'closed' ? 'close' : 'Re-open'} the ticket?`);
        if (confirmation) {
            if (action === 'closed') {
                const reason = window.prompt('Please provide a reason for Closing the ticket:');
                if (!reason) {
                    // If reason is not provided, return
                    return;
                }
            }
            else if (action === 're-opened') {
                const reason = window.prompt('Please provide a reason for Re-opened the ticket:');
                if (!reason) {
                    // If reason is not provided, return
                    return;
                }
            }

            // Proceed with updating ticket status
            const newStatus = action === 'closed' ? 'Closed' : 'Open';

            const formdata = new FormData();
            const storedUser = sessionStorage.getItem("user");
            if (storedUser) {
                const user = JSON.parse(storedUser);
                formdata.append("username", user.username);
                formdata.append("password", user.password);
            }
            formdata.append("_operation", "SaveRecord");
            formdata.append("recordId", id);
            formdata.append("module", "HelpDesk");
            formdata.append("mode", "all");
            formdata.append("values", JSON.stringify({
                ticketstatus: newStatus,
            }));

            const requestOptions = {
                method: "POST",
                headers: {
                    'Authorization': `Basic ${encodedCredentials}`,
                },
                body: formdata,
            };

            try {
                const response = await fetch(API_URL, requestOptions);
                if (!response.ok) {
                    console.error("Failed to update ticket status:", response.statusText);
                    return;
                }
                const data = await response.json();
                if (data.success) {
                    const updatedTicket = { ...ticket, ticketstatus: newStatus };
                    setTicket(updatedTicket);
                    toast.success(`Ticket ${action === 'closed' ? 'closed' : 're-opened'} successfully`, { autoClose: 2000 });
                    if (action === 'closed') {
                        // Redirect to the feedback page
                        navigate(`/feedback/${id}`);
                    }
                } else {
                    toast.error("An error occurred. Please try again.")
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('An error occurred. Please try again.', { autoClose: 2000 });
            }
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Ticket Detail" />
            <div className='grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
                <ChatsBox username={''} password={''} />
                <div className="col-span-12 xl:col-span-4">
                    {ticket ? (
                        <div className="p-6 col-span-12 rounded-2xl border border-stroke bg-white px-4 shadow-default xl:col-span-4">
                            <div className='flex items-center justify-between'>
                                <h4 className="text-xl font-bold text-[#D0662E] dark:text-white">Ticket Information</h4>
                                <h2>
                                    <span style={{
                                        color:
                                            ticket && ticket.ticketstatus === 'Closed' ? '#FF8545' :
                                                ticket && ticket.ticketstatus === 'Wait for response' ? '#F2B20E' :
                                                    ticket && ticket.ticketstatus === 'In Progress' ? '#E10707' :
                                                        ticket && ticket.ticketstatus === 'Open' ? '#248A3D' :
                                                            '#36BB2B'
                                    }}>
                                        {ticket && ticket.ticketstatus}
                                    </span>
                                </h2>

                            </div>
                            <form>
                                <div className='rounded-2xl border border-stroke bg-white p-6 mt-2'>
                                    <div className='mt-2'>
                                        <label className='font-semibold text-[#353535]'>Ticket No</label>
                                        <input
                                            type="text"
                                            disabled
                                            placeholder={ticket.ticket_no}
                                            value={ticket.ticket_no}
                                            className='border focus:border-[#D0662E] active:border-[#D0662E] border-stroke bg-white h-12 rounded-lg form-input dark:bg-zink-600/50  dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 dark:text-slate-500 dark:text-zink-100 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200  appearance-none w-full py-2 px-3 text-[#686b78] leading-tight'
                                        />
                                    </div>
                                    <div className='mt-2'>
                                        <label className='font-semibold text-[#353535]'>Category</label>
                                        <input
                                            type="text"
                                            disabled
                                            placeholder={ticket.ticketcategories}
                                            className='border focus:border-[#D0662E] active:border-[#D0662E] border-stroke bg-white h-12 rounded-lg form-input dark:bg-zink-600/50  dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 dark:text-slate-500 dark:text-zink-100 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200  appearance-none w-full py-2 px-3 text-[#686b78] leading-tight'
                                        />
                                    </div>
                                    <div className='mt-2'>
                                        <label className='font-semibold text-[#353535]'>Issue</label>
                                        <textarea
                                            placeholder={ticket.ticket_title}
                                            disabled
                                            className='border focus:border-[#D0662E] active:border-[#D0662E] border-stroke bg-white h-12 rounded-lg form-input dark:bg-zink-600/50  dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 dark:text-slate-500 dark:text-zink-100 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200  appearance-none w-full py-2 px-3 text-[#686b78] leading-tight'
                                        />
                                    </div>
                                    <div className='mt-2'>
                                        <label className='font-semibold text-[#353535]'>Description</label>
                                        <textarea
                                            placeholder={ticket.description}
                                            disabled
                                            className='border focus:border-[#D0662E] active:border-[#D0662E] border-stroke bg-white h-12 rounded-lg form-input dark:bg-zink-600/50  dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 dark:text-slate-500 dark:text-zink-100 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200  appearance-none w-full py-2 px-3 text-[#686b78] leading-tight'
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col mt-2">
                                    {uploadfile && uploadfile.length > 0 ? (
                                        <div className="flex flex-col mt-2">
                                            <label className='font-semibold text-[#353535]'>Attachment</label>
                                            {uploadfile.map((value, index) => (
                                                <div className="mt-2" key={index}>
                                                    <div className="flex justify-between items-center border border-stroke bg-white w-full h-12 rounded-lg mt-1 p-3">
                                                        <img src={uploadFile} />
                                                        <h3>{value.notes_title}</h3>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>No attachments available.</p>
                                    )}
                                </div>
                                <div className='mt-2'>
                                    {/* <h2><span className="font-semibold text-[#353535]">Status: </span>{ticket.ticketstatus}</h2> */}
                                    <h2><span className="font-semibold text-[#353535]">Assign To: </span>{ticket.assigned_user_id.label}</h2>
                                </div>
                                <div className='flex gap-10 mt-4'>
                                    <button
                                        type="button"
                                        className='w-35 h-10 rounded-lg bg-[#D0662E] flex text-center items-center justify-center gap-3'
                                        onClick={handleTicketClose}
                                    >
                                        <span className='text-white'>{ticket && ticket.ticketstatus === 'Closed' ? 'Re-open Ticket' : 'Close Ticket'}</span>
                                    </button>

                                </div>
                            </form>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>

            </div>
        </DefaultLayout>
    );
};

export default TicketDetail;
