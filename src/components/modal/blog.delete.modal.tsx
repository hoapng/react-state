import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { toast } from "react-toastify";
import { deleteABlog, resetDelete } from "../../redux/blog/blog.slide";
import { Button, Modal } from "react-bootstrap";

const BlogDeleteModal = (props: any) => {
  const { dataBlog, isOpenDeleteModal, setIsOpenDeleteModal } = props;
  const dispatch = useAppDispatch();
  const isDeleteSuccess = useAppSelector((state) => state.blog.isDeleteSuccess);

  useEffect(() => {
    if (isDeleteSuccess === true) {
      setIsOpenDeleteModal(false);

      toast("🦄 Wow so easy! Delete succeed");
      //reset redux
      dispatch(resetDelete());
    }
  }, [isDeleteSuccess]);

  const handleSubmit = () => {
    dispatch(deleteABlog({ id: dataBlog?.id }));
  };

  return (
    <Modal
      show={isOpenDeleteModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop={false}
      onHide={() => setIsOpenDeleteModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete A Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>Delete the blog: {dataBlog?.title ?? ""}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="warning"
          onClick={() => setIsOpenDeleteModal(false)}
          className="mr-2"
        >
          Cancel
        </Button>
        <Button onClick={() => handleSubmit()}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BlogDeleteModal;
