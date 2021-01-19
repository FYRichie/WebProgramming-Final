import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

ReactDOM.render(
  <Result
    icon={<SmileOutlined />}
    title="Great, we have done all the operations!"
    extra={<Button type="primary">Next</Button>}
  />,
  mountNode,
);