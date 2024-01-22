import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = (context);

    const { note, updatenote } = props;
    return (
        <>
            {/* <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex aline-item-center">
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted successfully","success") }}></i>
                    <i className="fa-solid fa-marker mx-2" onClick={()=>{updatenote(note);}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>  
           
                </div>
            </div>
        </div> */}
            <table className="table table-responsive">
                {/* <h1>Student Details</h1> */}
                {/* <thead>
                    <tr>
                        <th scope="col">Student Name</th>
                        <th scope="col">PhoneNo.</th>
                        <th scope="col">Seat type</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Update</th>
                    </tr>
                </thead> */}
                <tbody id='tableBody'>
                    <tr>
                        <td style={{width:"28.5%"}}>{note.title}</td>
                        <td style={{width:"20.5%"}}>{note.description}</td>
                        <td style={{width:"20.5%"}}>{note.tag}</td>
                        <td style={{width:"16.5%"}}>{<i className="fa-solid fa-trash-can mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Deleted successfully", "success") }}></i>}</td>
                        <td>{<i className="fa-solid fa-marker mx-2" onClick={() => { updatenote(note); }}></i>}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Noteitem
