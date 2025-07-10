export default function Overlay({ children, showPayment }) {
  return (
    <div className={`popup-overlay ${showPayment ? "show" : "hide"}`}>
      {children}
    </div>
  );
}
