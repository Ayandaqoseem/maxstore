import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";
import "./TransferModal.scss";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectReceiverName } from "../../redux/features/transaction/transactionSlice";

export default function TransferModal({
  transferData,
  isVerified,
  isLoading,
  handleInputChange,
  handleAccountChange,
  verifyUserAccount,
  transferMoney,
  closeModal,
}) {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const receiverName = useSelector(selectReceiverName);
  return (
    <section className="--100vh modal-section">
      <div className="--flex-center modal">
        <div className="--bg-light --p --card modal-content">
          <AiOutlineClose
            className="close-icon cm"
            color="red"
            size={16}
            onClick={(e) => closeModal(e)}
          />

          <div className="--flex-start modal-head --my">
            <AiOutlineInfoCircle
              color="orangered"
              size={18}
              className="info-icon"
            />
            <h4 className="--text-p --ml">Send Money To Someone.</h4>
          </div>
          {receiverName !== "" && (
            <span className="--flex-end">
              <b>Receiver's name: </b>&nbsp;
              <p className="receiver-name">{receiverName}</p>
            </span>
          )}
          <div className="modal-body">
            <form onSubmit={transferMoney}>
              <p className="req">
                <label>Amount</label>
                <input
                  ref={inputRef}
                  type="number"
                  placeholder="Amount"
                  required
                  name="amount"
                  value={transferData.amount}
                  onChange={handleInputChange}
                />
              </p>

              <p>
                <label>Receiver's Account</label>

                <span className="account-span">
                  <input
                    className="account"
                    type="text"
                    placeholder="Receiver's Account"
                    required
                    name="receiver"
                    value={transferData.receiver}
                    onChange={handleAccountChange}
                  />
                  <input
                    className="--btn --btn-danger --btn-lg"
                    type="button"
                    name="verify"
                    value={"verify"}
                    onClick={verifyUserAccount}
                  />
                </span>
              </p>
              <p className="req">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Description"
                  required
                  name="description"
                  value={transferData.description}
                  onChange={handleInputChange}
                />
              </p>
              {!isVerified && (
                <p className="--color-danger">
                  Please click the verify button above!!!
                </p>
              )}
              {isVerified && (
                <span className="--flex-end modal-footer">
                  <button
                    className="--btn --btn-lg cm"
                    onClick={(e) => closeModal(e)}
                  >
                    Cancel
                  </button>
                  {isLoading ? (
                    <button
                      type="button"
                      className="--btn --btn-primary --btn-lg cm"
                      disabled
                    >
                      Sending...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="--btn --btn-primary --btn-lg"
                    >
                      Send
                    </button>
                  )}
                </span>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
