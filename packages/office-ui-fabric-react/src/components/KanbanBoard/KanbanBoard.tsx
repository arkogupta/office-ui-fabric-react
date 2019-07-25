import * as React from 'react';
import { IKanbanBoardProps, IKanbanLaneProps, ILaneColumn, IKanbanLaneState } from './KanbanBoard.types';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { List } from 'office-ui-fabric-react/lib/List';
import { DefaultButton, PrimaryButton } from '../Button';

const classNames = mergeStyleSets({
  kanbanContainer: {
    display: 'flex',
    direction: 'column',
    overflowY: 'hidden',
    overflowX: 'auto',
    height: 'inherit'
  },
  kanbanLaneColumn: {
    position: 'relative',
    top: 0,
    margin: '5px',
    textAlign: 'center',
    overflow: 'hidden'
  },
  laneListWrapper: {
    overflowY: 'auto',
    maxHeight: '80%',
    overflowX: 'hidden'
  },
  fetchItemsButton: {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  laneItem: {
    overflow: 'hidden'
  },
  laneWrapper: {
    border: '1px dashed'
  }
});

export class KanbanBoard extends React.PureComponent<IKanbanBoardProps> {
  constructor(props: IKanbanBoardProps) {
    super(props);
  }
  public render(): JSX.Element {
    const columns = this.props.laneColumns;
    return (
      <div className={classNames.kanbanContainer}>
        {columns.map(element => {
          const key = KanbanLane.name + element.key;
          return <KanbanLane {...this.props} laneColumn={element} key={key} />;
        })}
      </div>
    );
  }
}
class KanbanLane extends React.PureComponent<IKanbanLaneProps, IKanbanLaneState> {
  private _laneColumnWidth: string = '200px';
  constructor(props: IKanbanLaneProps) {
    super(props);
    this._laneColumnWidth = (this.props.laneColumn.width && this.props.laneColumn.width.toString() + 'px') || this._laneColumnWidth;
    this.state = {
      items: (this.props.getItems && this.props.getItems(this.props.laneColumn)) || []
    };
  }
  public render(): JSX.Element {
    const laneWrapperStyle = { width: this._laneColumnWidth };
    return (
      <div style={laneWrapperStyle} className={classNames.laneWrapper}>
        {this._onRenderLaneColumn(this.props.laneColumn)}
        <div className={classNames.laneListWrapper}>
          <List items={this.state.items} onRenderCell={this._onRenderLaneItem} />
          <PrimaryButton iconProps={{ iconName: 'Add' }} onClick={this._onNewButtonClicked} style={{ margin: 5 }} />
          <DefaultButton primary text={`${this.props.laneColumn.name}`} onClick={this._fetchItems} style={{ margin: 5 }} />
        </div>
      </div>
    );
  }

  private _onNewButtonClicked = () => {
    const { onRenderNewCardPopUp } = this.props;
    const newItems = onRenderNewCardPopUp && onRenderNewCardPopUp();
    this.setState(state => {
      // Important: read `state` instead of `this.state` when updating.
      return { items: [...state.items, ...newItems] };
    });
  };

  private _fetchItems = () => {
    // improve this logic
    const newItems = (this.props.getItems && this.props.getItems(this.props.laneColumn)) || [];
    this.setState(state => {
      // Important: read `state` instead of `this.state` when updating.
      return { items: [...state.items, ...newItems] };
    });
  };

  private _onRenderLaneItem = (item?: any, index?: number): JSX.Element => {
    const { onRenderLaneItem } = this.props;
    return <div className={classNames.laneItem}>{onRenderLaneItem && onRenderLaneItem(item, index)}</div>;
  };

  private _onRenderLaneColumn(laneColumn: ILaneColumn) {
    return (
      <div className={classNames.kanbanLaneColumn}>
        {this.props.onRenderLaneColumn ? (
          this.props.onRenderLaneColumn
        ) : (
          <div className={classNames.kanbanLaneColumn}>{this.props.laneColumn.name}</div>
        )}
      </div>
    );
  }
}
