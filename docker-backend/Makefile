V        = @

deploy:
	$(V)docker-compose -f docker-compose-deploy.yml build
	$(V)docker-compose -f docker-compose-deploy.yml up -d

dev:
	$(V)docker-compose -f docker-compose-dev.yml build
	$(V)docker-compose -f docker-compose-dev.yml up

save:
	$(V)docker-compose -f docker-compose-dev.yml run egg npm i $(PKG) -S --registry=https://registry.npm.taobao.org 

save-dev:
	$(V)docker-compose -f docker-compose-dev.yml run egg npm i $(PKG) -D --registry=https://registry.npm.taobao.org 

test:
	$(V)docker-compose -f docker-compose-test.yml build
	$(V)docker-compose -f docker-compose-test.yml run egg npm run test

cov:
	$(V)docker-compose -f docker-compose-test.yml build
	$(V)docker-compose -f docker-compose-test.yml run egg npm run cov