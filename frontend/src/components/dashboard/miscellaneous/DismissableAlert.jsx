import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function DismissableAlert({variant, title, msg}) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant={variant} onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{title}</Alert.Heading>
        <p>{msg}</p>
      </Alert>
    );
  }
  return null;
}

export default DismissableAlert;