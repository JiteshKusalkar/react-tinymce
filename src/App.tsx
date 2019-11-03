import React from "react";
import HTMLEditor from "./components/HTMLEditor";

interface IOwnProps {}
interface IOwnState {
  content: string;
}

class App extends React.Component<IOwnProps, IOwnState> {
  constructor(props: IOwnProps) {
    super(props);

    this.state = { content: "" };
  }

  onEditorChange = (content: string) => this.setState({ content });

  render() {
    return (
      <div>
        <HTMLEditor
          content={this.state.content}
          onEditorChange={this.onEditorChange}
        />
      </div>
    );
  }
}

export default App;
