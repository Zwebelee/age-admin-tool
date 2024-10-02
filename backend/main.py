from app.app import create_app
app = create_app()  # TODO: Fix the requirement.txt! only reqs that are actually needed and not built in

if __name__ == '__main__':
    app.run(debug=True)
