import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';
import DateLogo from '../../images/calander/Glyph_ undefined.svg';
import fileAttach from '../../images/Button/Group.svg';
import rocetbtn from '../../images/Button/CTA.svg';
import ReactPaginate from 'react-paginate';
import { API_URL } from "../../utils/helpers/API";

type Comment = {
  assigned_user_id: { value: string; label: string };
  commentcontent: string;
  createdtime: string;
  modifiedtime: string;
  id: string;
  ticket_id: string;
  creator: { value: string; label: string };
  customer: { value: string; label: string };
  source: string;
  userid: string;
  reasontoedit: string;
  is_private: string;
  filename: string;
  related_email_id: string;
  user_select: string;
  user_select_email: string;
  attachments: {
    filename: string;
    attachmentid: string;
  }[];
};

type SendCommentProps = {
  assigned_user_id: { value: string; label: string };
  commentcontent: string;
  createdtime: string;
  modifiedtime: string;
  id: string;
  ticket_id: string;
  creator: { value: string; label: string };
  customer: { value: string; label: string };
  related_to: { value: string; label: string };
  source: string;
  userid: string;
  reasontoedit: string;
  is_private: string;
  filename: string;
  related_email_id: string;
  user_select: string;
  user_select_email: string;
  attachments: {
    filename: string;
    attachmentid: string;
  }[];
};

type countProps = {
  count: string;
}

interface Props {
  username: string;
  password: string;
}

const ChatBox: React.FC<Props> = ({ username, password }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [count, setCount] = useState<number>(0);
  const [newComment, setNewComment] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { id } = useParams<{ id: string }>();
  const encodedCredentials = btoa(`${username}:${password}`);
  

  const fetchComment = async (page: number = 0) => {
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

    formdata.append('_operation', 'FetchRelatedRecords');
    formdata.append('module', 'HelpDesk');
    formdata.append('recordId', id);
    formdata.append('relatedModule', 'ModComments');
    formdata.append('relatedModuleLabel', 'ModComments');
    formdata.append('mode', 'mine');
    formdata.append("page", page.toString());
    formdata.append("pageLimit", '20');

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
      if (!response.ok) {
        console.error("Failed to fetch comments:", response.statusText);
        return;
      }

      const jsondata = await response.json();
      setCount(jsondata.result.count);
      setComments(jsondata.result.data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchSendComment = async () => {
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
    formdata.append("_operation", "AddComment");
    if (file) {
      formdata.append('attachments', file);
    }
    formdata.append("values", JSON.stringify({
      commentcontent: newComment,
      related_to: id,
    }));

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
      if (data && data.success) {
        setNewComment('');
        setFile(null);
        fetchComment(currentPage);
      } else {
        console.error("Failed to add comment: ", data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchComment(currentPage);
  }, [id, currentPage]);

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const getFirstLetters = (name: string): string => {
    const words = name.split(" ");
    let result = "";
    for (let i = 0; i < 2 && i < words.length; i++) {
      result += words[i].charAt(0).toUpperCase();
    }
    return result;
  };

  // Pagination
  const commentsPerPage = 20;
  const pageCount = Math.ceil(count / commentsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="col-span-12 xl:col-span-8">
      {comments.length > 0 ? (
        <div className="p-6 h-screen overflow-auto no-scrollbar col-span-12 rounded-2xl border border-stroke bg-white px-4 shadow-default xl:col-span-4">
          <div className="flex justify-between">
            <div className='sticky'>
              <h1 className="text-[#353535] font-medium text-lg">Comment</h1>
            </div>
            <div className="hs-dropdown relative inline-flex">
              <button
                id="hs-dropdown-default"
                type="button"
                className="hs-dropdown-toggle p-2 inline-flex bg-[#F4F5F9] items-center gap-x-2 text-sm font-medium rounded-lg border border-stroke shadow-sm justify border-gray-200 text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
              >
                {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
                <svg className="hs-dropdown-open:rotate-180 size-4 text-[#D0662E] font-bold" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>
              </button>
            </div>
          </div>

          <div className="mt-5">
            {sortOrder === 'newest' ? (
              comments.map((comment, index) => (
                <div key={index} className="mt-3">
                  <div>{comment.customer.label || comment.creator.label}</div>
                  <div className="border border-[#F4F6F9] p-2 shadow-sm gap-3 bg-[#F4F6F9] rounded-md">
                    <div className="flex justify-end gap-2 text-sm">
                      <img className="flex" src={DateLogo} alt="Date Logo" />
                      {formatRelativeTime(comment.createdtime)}
                    </div>
                    <div className="flex gap-5 items-center">
                      {(comment.customer || comment.creator) ? (
                        <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${comment.customer ? 'bg-[#4EAAFF]' : 'bg-[#FFB44E]'}`}>
                          {getFirstLetters(comment.customer ? comment.customer.label : comment.creator.label)}
                        </div>
                      ) : null}
                      <p>{comment.commentcontent}</p>
                    </div>

                    <div className="flex justify-between text-sm">
                      {comment.attachments.map((attachment, index) => (
                        <div key={index} className="flex gap-2 pl-14">
                          <img className="flex" src={fileAttach} alt="File Attach" />
                          <p>{attachment.filename}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              comments.slice(0).reverse().map((comment, index) => (
                <div key={index} className="mt-3">
                  <div>{comment.customer.label || comment.creator.label}</div>
                  <div className="border border-[#F4F6F9] p-2 shadow-sm gap-3 bg-[#F4F6F9] rounded-md">
                    <div className="flex justify-end gap-2 text-sm">
                      <img className="flex" src={DateLogo} alt="Date Logo" />
                      {formatRelativeTime(comment.createdtime)}
                    </div>
                    <div className="flex gap-5 items-center">
                      {(comment.customer || comment.creator) ? (
                        <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${comment.customer ? 'bg-[#4EAAFF]' : 'bg-[#FFB44E]'}`}>
                          {getFirstLetters(comment.customer ? comment.customer.label : comment.creator.label)}
                        </div>
                      ) : null}
                      <p>{comment.commentcontent}</p>
                    </div>

                    <div className="flex justify-between text-sm">
                      {comment.attachments.map((attachment, index) => (
                        <div key={index} className="flex gap-2 pl-14">
                          <img className="flex" src={fileAttach} alt="File Attach" />
                          <p>{attachment.filename}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {pageCount > 1 && (
            <ReactPaginate className="flex justify-end gap-5 mt-2"
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={'pagination'}
              activeClassName={'active'}
              activeLinkClassName={currentPage === 0 ? 'rounded bg-[#D0662E] text-white p-1' : 'rounded bg-[#D0662E] text-white p-1'}
            />
          )}
        </div>
      ) : (
        <p>No comments available.</p>
      )}
      <div className="flex gap-2 static">
        <div className="flex w-[90%] mt-5 h-15 bg-white rounded-lg border border-stroke shadow-default justify-between">
          <input
            className="w-full p-2 border-none border-stroke bg-white rounded-lg form-input dark:bg-zink-600/50  dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 dark:text-slate-500 dark:text-zink-100 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200  appearance-none  text-[#686b78] leading-tight"
            placeholder="Type your message here..."
            value={newComment}
            id="newComment"
            name="newComment"
            type="text"
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex mr-5">
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            />
            <label htmlFor="fileInput" className="cursor-pointer items-center mt-5">
              <img src={fileAttach} className="w-6" />
            </label>
          </div>
        </div>
        <div>
          <button
            className="mt-5"
            onClick={fetchSendComment}
          >
            <img className="h-15 w-fit" src={rocetbtn} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
