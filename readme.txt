The purpose: remake the existing sites as templates
focuse on nodejs first then reactjs, php and wordpress as sidekcik
sites contain the CRUD functions, signup/login/logout functions
template sites:
1. jianshu.com
2. indeed job search
3. craigilist personal service section
4. some random business company sites

1.sitemap
home
	/index: display all the posts
user
	/user/login: login with email and password
	/user/logout
	/user/signup: register with name, email and password
show error alter in form page using axios call
posts
	/posts
	/posts/add: add new post, authentication required
	/posts/delete/:id, authentication required
	/posts/update/:id, authentication required
build posts schema
build add new post form
build addnewpost js script, axios call

