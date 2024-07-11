import { AiOutlineCiCircle, AiOutlineClose, AiOutlineCloseCircle, AiOutlineInfoCircle } from "react-icons/ai";
import "./DepositModal.scss"
import { useEffect, useRef } from "react";

export default function DepositModal({ depositMoney, closeModal, handleDepositInputChange, transferDepositData }) {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  return (
    <section className="--100vh modal-section">
      <div className="--flex-center modal">
        <div className="--bg-light --p --card modal-content">
          <AiOutlineClose
            color="red"
            size={16}
            className="close-icon cm"
            onClick={closeModal}
          />
          <div className="--flex-start modal-head --my">
            <AiOutlineInfoCircle 
              color="orangered"
              size={18}
              className="info-icon"
            />
            <h4 className="--text-p --ml">Deposit fund into your wallet.</h4>
          </div>
          <div className="modal-body">
            <form onSubmit={depositMoney}>
              <p>
                <label>Amount</label>
                <input 
                  ref={inputRef}
                  type="text"
                  placeholder="Amount"
                  required
                  name="amount"
                  value={transferDepositData.amount}
                  onChange={handleDepositInputChange}
                />
              </p>
              <p>
                <label htmlFor="stripe" className="radio-label">
                  <input 
                    type="radio"
                    className="radio-input"
                    name={"paymentMethod"}
                    value={"stripe"}
                    id="stripe"
                    onChange={handleDepositInputChange}
                  />
                  <span className="custom-radio" />
                  Stripe
                </label>
              </p>

              <p>
                <label htmlFor={"flutterwave"} className="radio-label">
                  <input 
                    className="radio-input"
                    type="radio"
                    name={"paymentMethod"}
                    id="flutterwave"
                    value={"flutterwave"}
                    onChange={handleDepositInputChange}
                  />
                  <span className="custom-radio"/>
                  Flutterwave
                </label>
              </p>
              <span className="--flex-end modal-footer">
                <button 
                  className="--btn --btn-lg cm"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="--btn --btn-primary --btn-lg"
                >
                  Proceed
                </button>
              </span>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
