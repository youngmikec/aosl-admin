import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';

//editor
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


import { ApiResponse } from '../../models';
import { CREATE_NEWLETTER } from '../../service';
import { ADD_TO_NEWSLETTERS } from '../../store/newsletter';


const NewsletterForm = () => {
    const dispatch = useDispatch();
    //input states
    const [loading, setLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<{value: string, error: boolean}>({ value: '', error: false});
    const [subject, setSubject] = useState<{value: string, error: boolean}>({ value: '', error: false});
    const [message, setMessage] = useState<{value: string, error: boolean}>({ value: '', error: false});
    
    //editor state
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

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
                message: message.value
            };
          // axios.defaults.withCredentials = true;
          CREATE_NEWLETTER(data)
            .then((res: AxiosResponse<ApiResponse>) => {
                const { message, payload } = res.data;
                setLoading(false);
                notify("success", message);
                dispatch(ADD_TO_NEWSLETTERS(payload));
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

    useEffect(() => {
        console.log(editorState);
    }, [editorState]);


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
                            <label htmlFor="message" className="text-[#BFBFBF] text-sm block">
                                Newsletter Message*
                            </label>
                            {/* <input
                                type="text"
                                name="message"
                                value={message.value}
                                onChange={(e) =>
                                    setMessage({ ...message, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    message.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            /> */}
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={setEditorState}
                            />
                        </div>


                        <div className="my-3 text-center">
                            <button
                                onClick={() => handleSubmit()}
                                className="bg-[#8652A4] text-white py-1 px-10 rounded-2xl"
                            >
                                {loading ? "Processing..." : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            <ToastContainer />
        </>
    )
}

export default NewsletterForm;