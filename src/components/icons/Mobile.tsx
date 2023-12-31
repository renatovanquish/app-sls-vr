const Mobile = ({ ...props }) => {
  return (
    <svg
      version="1.1"
      x="0px"
      y="0px"
      width="24px"
      height="24px"
      viewBox="0 0 512 512"
      enableBackground="new 0 0 512 512"
      className="inline-block"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M272,448c0,8.836-7.164,16-16,16s-16-7.164-16-16s7.164-16,16-16
    S272,439.164,272,448z M352,512H160c-35.348,0-64-28.656-64-64V240c0-8.836,7.164-16,16-16s16,7.164,16,16v208
    c0,17.672,14.328,32,32,32h192c17.672,0,32-14.328,32-32v-16c0-8.836-7.164-16-16-16H176c-8.836,0-16-7.164-16-16s7.164-16,16-16
    h200c19.352,0,35.484,13.742,39.195,32H416v32C416,483.344,387.344,512,352,512z M128,176c0,8.836-7.164,16-16,16s-16-7.164-16-16
    s7.164-16,16-16S128,167.164,128,176z M400,352c-8.836,0-16-7.164-16-16V64c0-17.672-14.328-32-32-32H160c-17.672,0-32,14.328-32,32
    v16c0,8.836,7.164,16,16,16h192c8.836,0,16,7.164,16,16s-7.164,16-16,16H136c-22.09,0-40-17.906-40-40V64c0-35.344,28.652-64,64-64
    h192c35.344,0,64,28.656,64,64v272C416,344.836,408.836,352,400,352z"
      />
    </svg>
  )
}

export default Mobile
