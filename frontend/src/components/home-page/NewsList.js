import React from 'react'
import Modal from 'react-modal';
import createNews from './News.js'
import {useState, useRef} from 'react';
import './NewsList.css'
import CloseIcon from '@mui/icons-material/Close';

const customStyles={
    content:{
        backgroundColor: 'rgb(244,244,244)',
        border: '1px solid rgba(250,250,250,0.9)',
        boxShadow: '0px 0px 4px gray',
        color: '#222023'  
    }
}
export default function CustomModal(newsData) {

        // scroll list
        const scrollListNode= useRef();
        const leftBtn =useRef();
        const rightBtn = useRef();
    
        function scrollNext() {
            scrollListNode.current.scrollBy({left:400, behavior: "smooth"})
        }
        function scrollPrev(){
            scrollListNode.current.scrollBy({left:-400, behavior: "smooth"})
        }
        // modal
        const [titleData, setTitle] = useState("");
        const [imgData, setImage] = useState("")
        const [descriptionData, setDescription] = useState("");
        const [modalOpen, setOpen] = useState(false);
    
        function openModal(data){
            setTitle(data.title);
            setImage(data.src);
            setDescription(data.description);
            setOpen(true);
            document.body.style.overflow = 'hidden';
        }
        function closeModal(){
            setOpen(false);
            document.body.style.overflow = 'visible';
        }


  return (
    
    <div className="news-container">
        <h1 className="news-title">News</h1>
        {/* scroll list */}
        <div className="scroll-list">
            <button className='x-scroll-btn left-btn' onClick={scrollPrev} ref={leftBtn}> &#9664; </button>
            <ul className="news-list" ref={scrollListNode}>
                {/* create news card */}
                {newsData.map((x, index) => <li key={x+index} className="news-items">{createNews(x, openModal)}</li>)}
            </ul>
            <button className='x-scroll-btn right-btn' onClick={scrollNext} ref={rightBtn}>&#9654; </button>

        </div>
        {/* modal */}
        <div className="news-modal">
            <Modal  ariaHideApp={false}
                isOpen={modalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                closeTimeoutMS={400}
                contentLabel="Example Modal"
            >
            <div className="modal-content">

                <img className="modal-img" src={imgData }/>
                
                <div className="modal-text">
                    <h1>{titleData}</h1>
                    <p>{descriptionData}</p>
                </div>
                <CloseIcon className='modal-close-btn' onClick={closeModal}></CloseIcon>
            </div>
            </Modal>
        </div>
    </div>
  )
}
