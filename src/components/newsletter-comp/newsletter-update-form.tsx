import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';

//editor
// import { EditorState } from 'draft-js';
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


import { ApiResponse, Newsletter } from '../../models';
import { CREATE_NEWLETTER, UPDATE_NEWSLETTER } from '../../service';
import { ADD_TO_NEWSLETTERS, UPDATE_NEWSLETTER_STATE } from '../../store/newsletter';


type Props = {
    newsletter?: Newsletter
}

const NewsletterUpdateForm = ({ newsletter }: Props) => {
    const dispatch = useDispatch();
    //input states
    const [loading, setLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<{value: string, error: boolean} | any>({ value: '', error: false});
    const [subject, setSubject] = useState<{value: string, error: boolean} | any>({ value: '', error: false});
    const [message, setMessage] = useState<{value: string, error: boolean} | any>({ value: '', error: false});
    const [status, setStatus] = useState<{value: string, error: boolean} | any>({ value: '', error: false});
    
    //editor state
    // const [editorState, setEditorState] = useState(() =>
    //     EditorState.createEmpty()
    // );

    const notify = (type: string, msg: string) => {
        if (type === "success") {
        toast.success(msg, {
            position: toast.POSITION.TOP_RIGHT,
        });
        }

        if (type === "error") {
        toast.error(msg, {
            position: toast.POSITION.TOP_RIGHT,
        });
        }
    };

    const inputCheck = (): boolean => {
        let isValid: boolean = true;
        if (title.value === "" || undefined || null) {
          isValid = false;
          setTitle({ ...title, error: true });
        } else {
          setTitle({ ...title, error: false });
        }

        if (subject.value === "" || undefined || null) {
          isValid = false;
          setSubject({ ...subject, error: true });
        } else {
          setSubject({ ...subject, error: false });
        }
        
        if (message.value === "" || undefined || null) {
          isValid = false;
          setMessage({ ...message, error: true });
        } else {
          setMessage({ ...message, error: false });
        }

        if (status.value === "" || undefined || null) {
          isValid = false;
          setStatus({ ...status, error: true });
        } else {
          setStatus({ ...status, error: false });
        }

        return isValid;
    };

    const clearFormStates = (): void => {
        setTitle({value: '', error: false});
        setSubject({value: '', error: false});
        setMessage({value: '', error: false});
    }

    const handleSubmit = (): void => {
        if (inputCheck()) {
            setLoading(true);
            const data = { 
                title: title.value,
                subject: subject.value,
                message: message.value,
                status: status.value,
            };
          // axios.defaults.withCredentials = true;
          const id: string = newsletter?.id ? newsletter.id : '';
          UPDATE_NEWSLETTER(id, data)
            .then((res: AxiosResponse<ApiResponse>) => {
                const { message, payload } = res.data;
                setLoading(false);
                notify("success", `Newsletter updated ${message}ly`);
                dispatch(UPDATE_NEWSLETTER_STATE(payload));
                clearFormStates();
            })
            .catch((err: any) => {
                const { message } = err.response.data;
                notify("error", message);
                setLoading(false);
            });
        }else {
            notify("error", `Fill in all required fields`);
        }  
    };

    // useEffect(() => {
    //     console.log(editorState);
    // }, [editorState]);
    useEffect(() => {
        setTitle({value: newsletter?.title, error: false});
        setSubject({value: newsletter?.subject, error: false});
        setMessage({value: newsletter?.message, error: false});
        setStatus({value: newsletter?.status, error: false});
        
    }, [])


    return (
        <>
            <div>
                    <div id='form'>

                        <div className="my-3">
                            <label htmlFor="title" className="text-[#BFBFBF] text-sm block">
                                Newsletter Title*
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={title.value}
                                onChange={(e) =>
                                    setTitle({ ...title, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    title.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="subject" className="text-[#BFBFBF] text-sm block">
                                Newsletter Subject*
                            </label>
                            <input
                                type="text"
                                name="subject"
                                value={subject.value}
                                onChange={(e) =>
                                    setSubject({ ...subject, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    subject.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="status" className="text-[#BFBFBF] text-sm block">
                                Status*
                            </label>
                            <select 
                                name="status" 
                                id="status"
                                value={status.value}
                                onChange={(e) =>
                                    setStatus({ ...status, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    status.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            >
                                <option value="PUBLISHED">Published</option>
                                <option value="PENDING">Pending</option>
                                <option value="DECLINED">Declined</option>
                            </select>
                            
                        </div>

                        <div className="my-3">
                            <label htmlFor="message" className="text-[#BFBFBF] text-sm block">
                                Newsletter Message*
                            </label>
                           <textarea 
                                name="message" 
                                id="message" 
                                cols={30} 
                                rows={10}
                                value={message.value}
                                onChange={(e) =>
                                    setMessage({ ...message, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    message.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            ></textarea>
                            {/* <Editor
                                editorState={editorState}
                                initialContentState={message as any}
                                onChange={(content) => {
                                    console.log(content)
                                }}
                                editorClassName={`bg-white text-[#6A6A6A] border-2 ${
                                    message.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full h-60`}
                                onEditorStateChange={setEditorState}
                            /> */}
                        </div>


                        <div className="my-3 text-center">
                            <button
                                onClick={() => handleSubmit()}
                                className="bg-[#134FE7] text-white py-1 px-10 rounded-2xl"
                            >
                                {loading ? "Processing..." : "update"}
                            </button>
                        </div>
                    </div>
                </div>
            <ToastContainer />
        </>
    )
}

export default NewsletterUpdateForm;