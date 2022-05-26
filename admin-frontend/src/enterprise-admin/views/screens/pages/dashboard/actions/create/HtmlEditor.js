import * as React from "react";
import { render } from "react-dom";
import ReactQuill, { Mixin, Toolbar, Quill } from "react-quill";
import Dropzone, { ImageFile } from "react-dropzone";
import { uploadFile } from "./uploads";
import "react-quill/dist/quill.snow.css";
import "./editor.css";
import "./liveedit.scss"
import $ from "jquery"
// import PropTypes from "proptypes"

// const __ISMSIE__ = navigator.userAgent.match(/Trident/i) ? true : false;
// const __ISIOS__ = navigator.userAgent.match(/iPad|iPhone|iPod/i) ? true : false;




// class HtmlEditor extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       subject: "",
//       contents: __ISMSIE__ ? "<p>&nbsp;</p>" : "",
//       workings: {},
//       fileIds: []
//     };

//     this.quillRef = null;
//   this.dropzone = null;
//   this.onKeyEvent = false;
//   }

   

//   saveFile = (file) => {
//     console.log("file", file);

//     const nowDate = new Date().getTime();
//     const workings = { ...this.state.workings, [nowDate]: true };
//     this.setState({ workings });

//     return uploadFile([file]).then(
//       (results) => {
//         const { sizeLargeUrl, objectId } = results[0];

//         workings[nowDate] = false;
//         this.setState({ workings, fileIds: [...this.state.fileIds, objectId] });
//         return Promise.resolve({ url: sizeLargeUrl });
//       },
//       (error) => {
//         console.error("saveFile error:", error);
//         workings[nowDate] = false;
//         this.setState({ workings });
//         return Promise.reject(error);
//       }
//     );
//   };

//   onDrop = async (acceptedFiles) => {
//     try {
//       await acceptedFiles.reduce((pacc, _file, i) => {
//         return pacc.then(async () => {
//           const { url } = await this.saveFile(_file);

//           const quill = this.quillRef.getEditor();
//           const range = quill.getSelection();
//           quill.insertEmbed(range.index, "image", url);
//           quill.setSelection(range.index + 1);
//           quill.focus();
//         });
//       }, Promise.resolve());
//     } catch (error) {}
//   };

//   imageHandler = () => {
//     if (this.dropzone) this.dropzone.open();
//   };

//   modules = {
//     toolbar: {
//       container: [
//         ["bold", "italic", "underline", "strike", "blockquote"],
//         [{ size: ["small", false, "large", "huge"] }, { color: [] }],
//         [
//           { list: "ordered" },
//           { list: "bullet" },
//           { indent: "-1" },
//           { indent: "+1" },
//           { align: [] }
//         ],
//         ["link", "image", "video"],
//         ["clean"]
//       ],
//       handlers: { image: this.imageHandler }
//     },
//     clipboard: { matchVisual: false }
//   };

//   formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "size",
//     "color",
//     "list",
//     "bullet",
//     "indent",
//     "link",
//     "image",
//     "video",
//     "align"
//   ];

//   onKeyUp = (event) => {
//     if (!__ISIOS__) return;
//     // enter
//     if (event.keyCode === 13) {
//       this.onKeyEvent = true;
//       this.quillRef.blur();
//       this.quillRef.focus();
//       if (document.documentElement.className.indexOf("edit-focus") === -1) {
//         document.documentElement.classList.toggle("edit-focus");
//       }
//       this.onKeyEvent = false;
//     }
//   };

//   onFocus = () => {
//     if (
//       !this.onKeyEvent &&
//       document.documentElement.className.indexOf("edit-focus") === -1
//     ) {
//       document.documentElement.classList.toggle("edit-focus");
//       window.scrollTo(0, 0);
//     }
//   };

//   onBlur = () => {
//     if (
//       !this.onKeyEvent &&
//       document.documentElement.className.indexOf("edit-focus") !== -1
//     ) {
//       document.documentElement.classList.toggle("edit-focus");
//     }
//   };

//   doBlur = () => {
//     this.onKeyEvent = false;
//     this.quillRef.blur();
//     // force clean
//     if (document.documentElement.className.indexOf("edit-focus") !== -1) {
//       document.documentElement.classList.toggle("edit-focus");
//     }
//   };

//   onChangeContents = (contents) => {
//     let _contents: string = null;
//     if (__ISMSIE__) {
//       if (contents.indexOf("<p><br></p>") > -1) {
//         _contents = contents.replace(/<p><br><\/p>/gi, "<p>&nbsp;</p>");
//       }
//     }
//     this.setState({ contents: _contents || contents });
//   };

//   render() {
//     return (
//       <div className="main-panel">
//         <div className="navbar">
//           {this.props.title}
//         </div>
//         <div className="main-content">
//           <ReactQuill
//             onRef={(el) =>  (this.quillRef = el)}
//             value={this.state.contents}
//             onChange={()=>{this.onChangeContents}}
//             onKeyUp={()=>{this.onKeyUp}}
//             onFocus={()=>{this.onFocus}}
//             onBlur={()=>{this.onBlur}}
//             theme="snow"
//             modules={()=>{this.modules}}
//             formats={()=>{this.formats}}
//           />
//           {/*<Dropzone
//             ref={(el: Dropzone) => (this.dropzone = el)}
//             style={{ width: 0, height: 0 }}
//             onDrop={this.onDrop}
//             accept="image/*"
//           />*/}
//         </div>
//       </div>
//     );
//   }
// }

// export default HtmlEditor
class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = { editorHtml: '', theme: 'snow' }
    this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange (html) {
  	this.setState({ editorHtml: html  });
    this.props.action(html)

    
    this.props.stateAction(this.props.placeholder, html)
    

  }


  


  componentDidMount() {
    $(function () {
        
        $('.md-trigger').on('click', function(e) {
          e.preventDefault()
          $('.md-modal-preview').addClass('md-show');

           //get the down element content and place in the modal box
        });
        
        $('.button-preview-md-close').on('click', function(e) {
          e.preventDefault()
          $('.md-modal-preview').removeClass('md-show');
           //get the cotent and preplace in to the initial preview box


              // $('#div1').html($('#div2').html());

        });
        
      });


    const first = document.querySelector(".first");
    const iframe = document.querySelector("iframe");
    const btn = document.querySelector("button");

    btn.addEventListener("click", () => {
      var html = first.textContent;
      iframe.src = "data:text/html;charset=utf-8," + encodeURI(html);
    });
  }
  
 
  
  render () {
    return (
      <div style={{marginLeft:"10px"}}>
        <br/><br/>
        <div>
         <p>{this.props.title}    </p>
         <div className="md-trigger button-preview" data-modal="modal-12">Live Edit Preview</div>

    
        </div>
        <ReactQuill 
          theme={this.state.theme}
          onChange={this.handleChange}
          value={this.state.editorHtml || '' }
          modules={Editor.modules}
          formats={Editor.formats}
          bounds={'.app'}
          placeholder={this.props.placeholder}
         />




         <div className="md-modal-preview md-effect-12">
              <div className="md-content">
                  <h3>Live Edit Preview  <button style={{float:"right"}} className="button-preview-md-close">Close</button></h3>
                  <div>

                      <div className="main-editor">
                        <button className="btn-test">Run</button>
                      <div  className="first" contentEditable={true}>
                        writecode
                      </div>
                        <iframe className="second" >
                        </iframe>
                      </div>
                      
                  </div>
              </div>
          </div>

          <div className="md-overlay"></div>
        
       </div>
     )
  }
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'},{'header': '3'},{'header': '4'},{'header': '5'},{'header': '6'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',"color","align",

    "image",
    "video",
//     
]

/* 
 * PropType validation
 */
// Editor.propTypes = {
//   placeholder: PropTypes.string,
// }


export default Editor