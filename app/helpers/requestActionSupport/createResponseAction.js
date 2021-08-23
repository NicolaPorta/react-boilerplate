export default function createResponseAction(actionKey) {
  return (fetchKey, payload) => ({
    type: actionKey,
    fetchKey,
    payload,
  });
}
