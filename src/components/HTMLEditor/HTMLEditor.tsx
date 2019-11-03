import React from "react";
import ReactDOM from "react-dom";
import { Editor } from "tinymce";
import tinymce from "tinymce/tinymce";

import "tinymce/themes/silver";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/table";

import Modal from "../Modal";

interface IOwnProps {
  id: string;
  content: string;
  onEditorChange: (content: string) => void;
}

interface IOwnState {
  editor: Editor | null;
}

export default class HTMLEditor extends React.Component<IOwnProps, IOwnState> {
  static defaultProps: IOwnProps = {
    id: "editor",
    content: "",
    onEditorChange: () => null
  };

  constructor(props: IOwnProps) {
    super(props);

    this.state = { editor: null };
  }

  componentDidMount() {
    tinymce.init({
      selector: `#${this.props.id}`,
      skin_url: `/skins/ui/oxide`,
      toolbar: `undo redo | styleselect | bold italic | link image
      | alignleft aligncenter alignright alignjustify | myModal`,
      plugins: "wordcount table",
      setup: (editor: any) => {
        let show = false;

        const toggleModal = (ed: Editor) => () => {
          show = !show;
          ReactDOM.render(
            <Modal
              show={show}
              onClose={toggleModal(ed)}
              header="Modal Header"
              body={this.renderModalBody(ed)}
            />,
            document.getElementById("editor-modal")
          );
        };

        this.setState({ editor });
        editor.on("keyup change", () => {
          const content = editor.getContent();
          this.props.onEditorChange(content);
        });

        editor.ui.registry.addButton("myModal", {
          text: "My Modal",
          onAction: toggleModal(editor)
        });
      }
    });
  }

  componentWillUnmount() {
    tinymce.remove(this.state.editor);
  }

  renderModalBody = (ed: Editor) => (
    <button onClick={() => ed.insertContent("Hi")}>Click to insert Hi</button>
  );

  render() {
    return (
      <>
        <textarea
          id={this.props.id}
          value={this.props.content}
          onChange={e => console.log(e)}
        />
        <div id="editor-modal" />
      </>
    );
  }
}
