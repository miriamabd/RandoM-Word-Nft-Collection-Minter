import PropTypes from "prop-types";
import { Button } from "react-bootstrap";


const AddNfts = ({ save }) => {
  return (
    <>
      <Button
        onClick={() => save()}
        variant="link"
        className="rounded-pill px-2 py-2"
      >
        <h1 className="fs-4 fw-bold mb-0 text-brown">{"Mint Random Words"}</h1> 
      </Button>

    
    </>
  );
};

AddNfts.propTypes = {
  save: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
};

export default AddNfts;