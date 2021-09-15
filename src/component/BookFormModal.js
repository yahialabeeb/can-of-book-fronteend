import React from "react";




class BookFormModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
        };
    }

    render() {
        return (
            <>
                {this.props.showAddBookForm &&
                    < form onSubmit={this.props.addBook}>
                        <label>New Book</label>
                        <input type="text" name='bookName' placeholder='Enter your Book Title   ' />
                        <input type="text" name='description' placeholder='Enter book description' />
                        <input type="text" name='status' placeholder='Enter book status' />
                        <input type="submit" value="Add new book" />
                    </form>}
            </>
        );
    }
}

export default BookFormModal;