# Task Rule Routes
@task_bp.route('/taskrules', methods=['GET'])
def get_task_rules():
    task_rules = TaskRule.query.all()
    return jsonify([task_rule.to_dict() for task_rule in task_rules])

@task_bp.route('/taskrules/<int:id>', methods=['GET'])
def get_task_rule(id):
    task_rule = TaskRule.query.get_or_404(id)
    return jsonify(task_rule.to_dict())

@task_bp.route('/taskrules', methods=['POST'])
def create_task_rule():
    data = request.get_json()
    task_rule = TaskRule(**data)
    db.session.add(task_rule)
    db.session.commit()
    return jsonify(task_rule.to_dict()), 201

@task_bp.route('/taskrules/<int:id>', methods=['PUT'])
def update_task_rule(id):
    task_rule = TaskRule.query.get_or_404(id)
    data = request.get_json()
    for key, value in data.items():
        setattr(task_rule, key, value)
    db.session.commit()
    return jsonify(task_rule.to_dict())

@task_bp.route('/taskrules/<int:id>', methods=['DELETE'])
def delete_task_rule(id):
    task_rule = TaskRule.query.get_or_404(id)
    db.session.delete(task_rule)
    db.session.commit()
    return '', 204