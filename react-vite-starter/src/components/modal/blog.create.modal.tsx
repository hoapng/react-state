import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { createNewBlog, resetCreate } from "../../redux/blog/blog.slide";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

const BlogCreateModal = (props: any) => {
  const { isOpenCreateModal, setIsOpenCreateModal } = props;
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const isCreateSuccess = useAppSelector((state) => state.blog.isCreateSuccess);

  useEffect(() => {
    if (isCreateSuccess === true) {
      setIsOpenCreateModal(false);
      setTitle("");
      setAuthor("");
      setContent("");
      toast("🦄 Wow so easy! Create succeed");
      //reset redux
      dispatch(resetCreate());
    }
  }, [isCreateSuccess]);

  const handleSubmit = () => {
    if (!title) {
      alert("title empty");
      return;
    }
    if (!author) {
      alert("author empty");
      return;
    }
    if (!content) {
      alert("content empty");
      return;
    }
    //call api => call redux
    dispatch(createNewBlog({ title, author, content })); //payload
  };

  return (
    <>
      <Modal
        show={isOpenCreateModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop={false}
        onHide={() => setIsOpenCreateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add A New Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel label="Title" className="mb-3">
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
          </FloatingLabel>
          <FloatingLabel label="Author" className="mb-3">
            <Form.Control
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              type="text"
            />
          </FloatingLabel>
          <FloatingLabel label="Content">
            <Form.Control
              value={content}
              onChange={(e) => setContent(e.target.value)}
              type="text"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={() => setIsOpenCreateModal(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BlogCreateModal;
