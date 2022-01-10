sudo systemctl start mongod
cd data
./import.sh
cd ..
npm install
node server.js