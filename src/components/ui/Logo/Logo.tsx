const Logo = ({ className = '', ...props }) => (
  <img
    alt=""
    style={
      props.maxHeight ? { 
        maxHeight: props.maxHeight 
      } : { 
        maxHeight: 100 
      }
    }
    src="/logo/logo.png"
  />
)

export default Logo
