The following are the pre-requisites:

1. https://hyperledger.github.io/composer/latest/installing/installing-prereqs.html

2. https://hyperledger.github.io/composer/latest/installing/development-tools.html

To build a fin-net(Financial Transaction Approval) using Hyperledger Composer.
It will have faculty members, finance account official, dean and HoD.
A faculty member request for amount approval, and all transactions are recorded on blockchain.
A RESTful API for the same is exposed to make UI interface around it using Angular.

Steps:
1. Make sure docker is running, then run 
			
			./startFabric.sh. 

	it’ll take a couple of minutes.

The following was done while creating the relevant skeleton code base for the Business Network:
	a. Creation of skeleton business network using Yeoman. It consists of the data model, transaction logic, and access control rules. The transaction logic is coded in JavaScript.
	b. models/test.cto contains the class definitions for all assets, participants, and transactions in the business network. This file is written in Hyperledger Composer Modelling Language.
	c. transaction logic is coded in JavaScript.

Move to the fin-net directory before running the following commands:

2. business network packaging into a deployable business network archive (.bna) file. 

		composer archive create -t dir -n .

3. A peer admin business network card is created to deploy a Hyperledger Composer business network to a Hyperledger Fabric instance. (from the fin-net directory itself)

		../createPeerAdminCard.sh 

4. Deploy the Business Network Archive file on the Fabric using composer

		composer network install --card PeerAdmin@hlfv1 --archiveFile fin-net\@0.0.1.bna 

		composer network start --networkName fin-net --networkVersion 0.0.1 --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --file networkadmin.card

5. Import the network administrator identity as a usable business network card

		composer card import --file networkadmin.card

6. RESTful APIs were exposed using the command line arguments.

		composer-rest-server -c admin@fin-net -n always -u true -d Y -w true

7. Add two faculty members using the web interface on http://localhost:3000/explorer/

8. Add 2 accounts linked to these two faculty members.

9. Add Dean and HoD account

10. Add financial department person's account

11. For approval request the threshold limit is 10,000 INR. If a faculty member tries to request for approval of more than the threshold amount(INR 10,000), then an additional approval is required from HoD/Dean. The chaincode compares the requested amount with the threshold amount at this point.


12. Angular Front End is created using the following command(in another termimal shell)
		
			yo

	There are multiple question here to be answered for the angular front end.
	Here is a sample:

	
		hadoop-bhavesh:fin-net bhavesh$ yo
		? 'Allo Bhavesh! What would you like to do? Hyperledger Composer

		Welcome to the Hyperledger Composer project generator
		? Please select the type of project: Angular
		You can run this generator using: 'yo hyperledger-composer:angular'
		Welcome to the Hyperledger Composer Angular project generator
		? Do you want to connect to a running Business Network? Yes
		? Project name: fin-net-app
		? Description: Financial Transaction Approval at Ashoka University
		? Author name: Bhavesh
		? Author email: bhavesh.neekhra_phd18@ashoka.edu.in
		? License: Apache-2.0
		? Name of the Business Network card: admin@fin-net
		? Do you want to generate a new REST API or connect to an existing REST API?  Connect to an existing REST API
		? REST server address: http://localhost
		? REST server port: 3000
		? Should namespaces be used in the generated REST API? Namespaces are used

13. Move into fin-net-app directory. Following command will start the Angular server at port no. 4200 with fin-net-app. This takes few minutes to set up the server.
		
		npm start

	


	

