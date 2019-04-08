import React from 'react';
import {Scene, Router, Actions} from 'react-native-router-flux';
import List from './List';
import ListCreate from './ListCreate';
import ListEdit from './ListEdit';

const RouterComponent = () => {
	return (
		<Router hideNavBar>
			<Scene key="root">
					<Scene 
						key="List" 
						component={List} 
						title="List"
						initial
					/>
					<Scene 
						key="listCreate" 
						onLeft={() => Actions.List()}
						component={ListCreate} 
						title="Create"
						hideNavBar={true}
					/>
					<Scene 
						key="listEdit" 
						component={ListEdit} 
						title="Edit"
						hideNavBar={true}
					/>
			</Scene>
		</Router>
	);
};

export default RouterComponent;