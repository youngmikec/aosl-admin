import { useState, useEffect, FC, useRef } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import 'react-quill/dist/quill.snow.css';  // Import the "snow" theme CSS

import { useFormik } from 'formik';
import * as Yup from 'yup';


import { ADD_TO_BLOGS } from '../../store/blog';
import { CREATE_BLOG } from '../../service/blogs';
import { ApiResponse, BlogPost } from '../../models';
import { getItem } from '../../utils';
import { BlogCategories, BlogStatusOptions } from '../../constants';
import ReactQuill from 'react-quill';

type Props = {
  mode: 'create' | 'update';
  role?: string;
  record: BlogPost | null;
  onSuccess?: () => any;
}

const BlogForm: FC<Props> = ({
  mode = 'create', 
  record , 
  role = '',
  onSuccess
}) => {
    const dispatch = useDispatch();
    const fileRef = useRef<HTMLInputElement>(null);
    const [formMode, setFormMode] = useState<string>('create');

  const [intialFormValues, setIntialFormValues] = useState({ 
    title: '',
    subTitle: '',
    content: '',
    tags: '',
    status: 'DRAFT',
    enableComments: false,
    enableCommentReplies: false,
    category: 'GENERAL',
    coverImage: '',
  });

  const openFile = () => {
    return fileRef.current?.click();
  }

  const removeImage = () => {
    setFieldValue('coverImage', '');
  }

  const handleFileRead = async (event: any) => {
    const file = event.target.files[0];
    const base64: any = await convertBase64(file);
    setFieldValue('coverImage', base64);
  }

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
          reject(error);
      }
    })
  }

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      ['link', 'image'],
      [{ 'align': [] }],
      ['clean'] // remove formatting button
    ]
  };

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


  const clearFormStates = () => {
    setIntialFormValues({ 
      title: '',
      subTitle: '',
      content: '',
      tags: '',
      status: 'DRAFT',
      enableComments: false,
      enableCommentReplies: false,
      category: 'GENERAL',
      coverImage: '',
    })
  }

  const validateForm = () => {
    const validationSchema = Yup.object({
      title: Yup.string().required('Title is required'),
      subTitle: Yup.string().optional(),
      content: Yup.string().required('Blog Post content is required'),
      status: Yup.string().required('Status is required'),
      category: Yup.string().required('Category is required'),
      enableComments: Yup.boolean().required('required'),
      enableCommentReplies: Yup.boolean().required('required'),
      coverImage: Yup.string().required(),
    })
    return validationSchema;
  }

  const {isSubmitting, setSubmitting, values, touched, errors, handleChange, setFieldValue, handleSubmit} = useFormik({
    initialValues: intialFormValues,
    isInitialValid: true,
    validationSchema: validateForm(),
    onSubmit: (values) => {
      const loggedUser = getItem('clientD');
      const data = { 
        title: values.title,
        subTitle: values.subTitle,
        content: values.content,
        author: loggedUser ? loggedUser?.id : '',
        tags: values.tags.split(','),
        status: values.status,
        enableComments: values.enableComments,
        enableCommentReplies: values.enableCommentReplies,
        category: values.category,
        coverImage: values.coverImage,
      };
      CREATE_BLOG(data)
      .then((res: AxiosResponse<ApiResponse>) => {
          const { message, payload } = res.data;
          setSubmitting(false);
          notify("success", message);
          onSuccess && onSuccess();
          dispatch(ADD_TO_BLOGS(payload));
          clearFormStates();
      })
      .catch((err: any) => {
          const { message } = err.response.data;
          notify("error", message);
          setSubmitting(false);
      });
    }
  });

    const handleContentChange = (value: string) => {
      setFieldValue('content', value);
    }

    useEffect(() => {
      if(mode){
        setFormMode(mode);
      }
    }, [mode])

    return (
      <>
        <div id='form'>
          <h1 className="text-[#134fe7] font-bold text-2xl my-4">{ formMode === 'create' ? 'Create' : 'Edit' } Blog Post</h1>

          <div className="my-3">
              <div
                  className={`border-2 rounded-md my-3 h-60 w-full flex justify-center ${
                    errors.coverImage ? 'error-border' : 'input-border'
                  } px-4 py-2 relative`}
              >
                  {values.coverImage && <span onClick={() => removeImage()} className='absolute top-2 cursor-pointer right-3 z-10'>X</span>}
                  {
                    values.coverImage ? 
                    <img src={values.coverImage} width="30%" className='cursor-pointer' alt="uploaded" onClick={() => openFile()} /> :
                    <button className='text-center text-[#7F7F80]' onClick={() => openFile()}>
                        + <br /> Add a cover image
                    </button>
                  }
                  <input 
                    type="file" 
                    className='hidden'
                    ref={fileRef}
                    onChange={(e) => handleFileRead(e)}
                  />
              </div>
          </div>

          <div className="my-3">
              <label htmlFor="shortName" className="text-black text-sm block">
                Blog Title*
              </label>
              <input
                  type="text"
                  name="title"
                  placeholder="New blog post title"
                  value={values.title}
                  onChange={handleChange}
                  className={`bg-white text-[#6A6A6A] border-2 ${
                    (touched.title && errors.title) ? 'error-border' : 'input-border'
                  } rounded-md px-4 py-2 w-full`}
              />
          </div>

          <div className="my-3">
            <label htmlFor="rate" className="text-black text-sm block">
              Optional Blog Subtitle*
            </label>
            <input
              type="text"
              name="subTitle"
              placeholder='Optional subtitle'
              value={values.subTitle}
              onChange={handleChange}
              className={`bg-white text-[#6A6A6A] border-2 ${
                (touched.subTitle && errors.subTitle) ? 'error-border' : 'input-border'
              } rounded-md px-4 py-2 w-full`}
            />
          </div>

          <div className="my-3">
            <label htmlFor="txnNetwork" className="text-black text-sm block">
              Enter 5 keywords or tags
            </label>
            <input
              type="text"
              name="tags"
              placeholder='Enter 5 comma seperated keywords'
              value={values.tags}
              onChange={handleChange}
              className={`bg-white text-[#6A6A6A] border-2 ${
                (touched.tags && errors.tags) ? 'error-border' : 'input-border'
              } rounded-md px-4 py-2 w-full`}
            />
          </div>

          <div className="my-3">
            <label htmlFor="issueDate" className="text-black text-sm block">
              Blog Post Category*
            </label>
            <select 
              name="category" 
              id="category"
              value={values.category}
              onChange={handleChange}
              className={`bg-white text-[#6A6A6A] border-2 ${
              (touched.category && errors.category) ? 'error-border' : 'input-border'
            } rounded-md px-4 py-2 w-full`}
            >
              <option value="">Select Category</option>
              {
                BlogCategories.map((option: string, idx: number) => (
                  <option 
                    key={idx} 
                    value={option}
                  >{option}</option>
                ))
              }
            </select>
            
          </div>

          <div className="my-3">
            <label htmlFor="issueDate" className="text-black text-sm block">
              Blog Post Status*
            </label>
            <select 
              name="status" 
              id="status"
              onChange={handleChange}
              value={values.status}
              className={`bg-white text-[#6A6A6A] border-2 ${
              (touched.status && errors.status) ? 'error-border' : 'input-border'
            } rounded-md px-4 py-2 w-full`}
            >
              <option value="">Select Status</option>
              {
                BlogStatusOptions.map((option: string, idx: number) => (
                  <option 
                    key={idx} 
                    value={option}
                  >{option}</option>
                ))
              }
            </select>
            
          </div>

          <div className="my-3">
            <label htmlFor="issueDate" className="text-black text-sm block">
              Blog Content
            </label>
            <ReactQuill 
              theme={'snow'} 
              modules={modules}
              className='h-[150px]'
              value={values.content}
              onChange={handleContentChange}
            />
          </div>

          

          <div className="my-3 flex justify-center">
              <button
                onClick={() => handleSubmit()}
                className="bg-[#134FE7] hover:bg-[#1041be] text-white py-2 px-10 rounded-2xl"
              >
                  {isSubmitting ? "Processing..." : "Create"}
              </button>
          </div>
        </div>
        

        <ToastContainer />
      </>
    )
}

export default BlogForm;