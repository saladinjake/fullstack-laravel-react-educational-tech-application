import * as React from "react";
import { render } from "react-dom";
// import ReactQuill, { Mixin, Toolbar, Quill } from "react-quill";
import Dropzone, { ImageFile } from "react-dropzone";
import { uploadFile } from "../../helpers/uploads";
// import "react-quill/dist/quill.snow.css";
// import "./editor.css";
// import "./liveedit.scss"
import $ from "jquery"


// export default HtmlEditor
class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = { editorHtml: this.props.value, theme: 'snow' }
    this.handleChange = this.handleChange.bind(this)
  }
  
    handleChange (html) {
    this.setState({ editorHtml: html  });
    this.props.action(html)

    
    this.props.stateAction(this.props.placeholder, html)
    

  }


  componentDidMount() {
    $(function () {
        
        $('.md-trigger').on('click', function() {
          $('.md-modal-preview').addClass('md-show');

           //get the down element content and place in the modal box
        });
        
        $('.button-preview-md-close').on('click', function() {
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
         <p>{this.props.placeholder}    </p>
         {/*<button className="md-trigger button-preview" data-modal="modal-12">Live Edit Preview</button>*/}

    
        </div>
        {/* <ReactQuill 
          theme={this.state.theme}
          onChange={(e) =>{this.handleChange(e)}}
          value={this.state.editorHtml}
          name={this.props.name}
          modules={Editor.modules}
          formats={Editor.formats}
          bounds={'.app'}
          placeholder={this.props.placeholder}
         /> */}




         <div className="md-modal-preview md-effect-12">
              <div className="md-content">
                  <h3>Live Edit Preview  <button style={{float:"right"}} className="button-preview-md-close">Close</button></h3>
                  <div>

                      <div className="main-editor">
                        <button className="btn-test">Run</button>
                      <div  className="first" contenteditable={true}>
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
// Editor.modules = {
//   toolbar: [
//     [{ 'header': '1'}, {'header': '2'},{'header': '3'},{'header': '4'},{'header': '5'},{'header': '6'}, { 'font': [] }],
//     [{size: []}],
//     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//     [{'list': 'ordered'}, {'list': 'bullet'}, 
//      {'indent': '-1'}, {'indent': '+1'}],
//     ['link', 'image', 'video'],
//     ['clean']
//   ],
//   clipboard: {
//     // toggle to add extra line breaks when pasting HTML:
//     matchVisual: false,
//   }
// }
// /* 
//  * Quill editor formats
//  * See https://quilljs.com/docs/formats/
//  */
// Editor.formats = [
//   'header', 'font', 'size',
//   'bold', 'italic', 'underline', 'strike', 'blockquote',
//   'list', 'bullet', 'indent',
//   'link', 'image', 'video',"color","align",

//     "image",
//     "video",
// //     
// ]

// /* 
//  * PropType validation
//  */
// // Editor.propTypes = {
// //   placeholder: PropTypes.string,
// // }


export default Editor