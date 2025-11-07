import { Link, useNavigate, useParams } from "react-router-dom";
import lightLogo from "../imgs/logo-light.png";
import darkLogo from "../imgs/logo-dark.png";
import AnimationWrapper from "../common/page-animation";
import lightBanner from "../imgs/blog banner light.png";
import darkBanner from "../imgs/blog banner dark.png";
import { uploadImage } from "../common/aws";
import { useContext, useEffect, useState } from "react"; // Import useState
import { Toaster, toast } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./tools.component";
import axios from "axios";
import { ThemeContext, UserContext } from "../App";

const BlogEditor = () => {

    let { blog, blog: { title, banner, content, tags, des }, setBlog, textEditor, setTextEditor, setEditorState } = useContext(EditorContext)

    // New states for word count and reading time
    const [wordCount, setWordCount] = useState(0);
    const [readingTime, setReadingTime] = useState(0);

    let { userAuth: { access_token } } = useContext(UserContext)
    let { theme } = useContext(ThemeContext);
    let { blog_id } = useParams();

    let navigate = useNavigate();

    // Helper function to calculate stats
    const calculateStats = (blocks) => {
        if (!blocks) {
            setWordCount(0);
            setReadingTime(0);
            return;
        }

        let totalWords = 0;
        blocks.forEach(block => {
            // Check for text-based blocks
            if (block.type === 'paragraph' || block.type === 'header' || block.type === 'quote') {
                if (block.data && block.data.text) {
                    totalWords += block.data.text.split(/\s+/).filter(Boolean).length;
                }
            } else if (block.type === 'list') {
                // 'list' items are in an 'items' array
                if (block.data && block.data.items) {
                    block.data.items.forEach(item => {
                        totalWords += item.split(/\s+/).filter(Boolean).length;
                    });
                }
            }
        });
        setWordCount(totalWords);
        
        // Avg reading speed: 225 wpm
        const avgWPM = 225;
        const time = Math.ceil(totalWords / avgWPM);
        // Show "1 min read" for very short posts, otherwise the calculated time
        setReadingTime(time > 0 ? time : (totalWords > 0 ? 1 : 0));
    };

    // useEffect
    useEffect(() => {
        if(!textEditor.isReady){
            
            const initialContent = Array.isArray(content) ? content[0] : content;
            
            // Calculate stats for initial content on load
            if (initialContent && initialContent.blocks) {
                calculateStats(initialContent.blocks);
            }

            setTextEditor(new EditorJS({
                holderId: "textEditor",
                data: initialContent,
                tools: tools,
                placeholder: "Let's write an awesome story",
                async onChange(api, event) { // Add this onChange handler
                    // Get the latest content data
                    const data = await api.saver.save();
                    // Recalculate stats every time the editor changes
                    calculateStats(data.blocks);
                }
            }))
        }
    }, [])

    const handleBannerUpload = (e) => {
        let img = e.target.files[0];

        if(img){

            let loadingToast = toast.loading("Uploading...")

            uploadImage(img).then((url) => {
                if(url){

                    toast.dismiss(loadingToast);
                    toast.success("Uploaded 👍");

                    setBlog({ ...blog, banner: url })

                }
            })
            .catch(err => {
                toast.dismiss(loadingToast);
                return toast.error(err.message);
            })
        }
    }

    const handleTitleKeyDown = (e) => {
        if(e.keyCode == 13) { // enter key
            e.preventDefault();
        }
    }

    const handleTitleChange = (e) => {
        let input = e.target;

        input.style.height = 'auto';
        input.style.height = input.scrollHeight + "px";

        setBlog({ ...blog, title: input.value })
    }

    const handleError = (e) => {
        let img = e.target;

        img.src = theme == "light" ? lightBanner : darkBanner;
    }

    const handlePublishEvent = () => {
        
        if(!banner.length){
            return toast.error("Upload a blog banner to publish it")
        }

        if(!title.length){
            return toast.error("Write blog title to publish it")
        }

        if(textEditor.isReady){
            textEditor.save().then(data => {
                if(data.blocks.length){
                    setBlog({ ...blog, content: data });
                    setEditorState("publish")
                } else{
                    return toast.error("Write something in your blog to publish it")
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }

    }

    const handleSaveDraft = (e) => {

        if(e.target.className.includes("disable")) {
            return;
        }

        if(!title.length){
            return toast.error("Write blog title before saving it as a draft")
        }

        let loadingToast = toast.loading("Saving Draft....");

        e.target.classList.add('disable');

        if(textEditor.isReady){
            textEditor.save().then(content => {

                let blogObj = {
                    title, banner, des, content, tags, draft: true
                }

                axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog", { ...blogObj, id: blog_id }, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                })
                .then(() => {
                    
                    e.target.classList.remove('disable');
        
                    toast.dismiss(loadingToast);
                    toast.success("Saved 👍");
        
                    setTimeout(() => {
                        navigate("/dashboard/blogs?tab=draft")
                    }, 500);
        
                })
                .catch(( { response } ) => {
                    e.target.classList.remove('disable');
                    toast.dismiss(loadingToast);
        
                    let errorMsg = response ? response.data.error : "An unknown error occurred";
                    return toast.error(errorMsg);
                })

            })
        }
    }

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="flex-none w-10">
                    <img src={ theme == "light" ? darkLogo : lightLogo } />
                </Link>
                {/* Added dark mode text color */}
                <p className="max-md:hidden text-black dark:text-white/70 line-clamp-1 w-full">
                    { title.length ? title : "New Blog" }
                </p>

                {/* Updated this div to include stats */}
                <div className="flex gap-4 ml-auto items-center">
                    
                    {/* New Stats Display: Word Count */}
                    <div className="flex gap-2 items-center text-dark-grey max-md:hidden">
                        <i className="fi fi-rr-pencil-line-slanted text-xl"></i>
                        <p className="text-sm">{wordCount} Words</p>
                    </div>

                    {/* New Stats Display: Reading Time */}
                    <div className="flex gap-2 items-center text-dark-grey max-lg:hidden">
                        <i className="fi fi-rr-clock-five text-xl"></i>
                        <p className="text-sm">{readingTime} min read</p>
                    </div>
                    
                    <button className="btn-dark py-2"
                        onClick={handlePublishEvent}
                    >
                        Publish
                    </button>
                    <button className="btn-light py-2"
                        onClick={handleSaveDraft}
                    >
                        Save Draft
                    </button>
                </div>
            </nav>
            <Toaster />
            <AnimationWrapper>
                <section>
                    <div className="mx-auto max-w-[900px] w-full">
                         

                        <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
                            <label htmlFor="uploadBanner">
                                <img 
                                    src={banner}
                                    className="z-20"
                                    onError={handleError}
                                />
                                <input 
                                    id="uploadBanner"
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    hidden
                                    onChange={handleBannerUpload}
                                />
                            </label>
                        </div>

                        <textarea
                            defaultValue={title}
                            placeholder="Blog Title"
                            className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40 bg-white"
                            onKeyDown={handleTitleKeyDown}
                            onChange={handleTitleChange}
                        ></textarea>

                        <hr className="w-full opacity-10 my-5" />

                        <div id="textEditor" className="font-gelasio"></div>

                    </div>
                </section>
            </AnimationWrapper>
        </>
    )
}

export default BlogEditor;