import networkx as nx

def build_dag_from_edges(edges):
    """
    Builds a NetworkX Directed Graph from a list of edges.
    edges: List of tuples (source_skill_id, target_skill_id)
    """
    G = nx.DiGraph()
    G.add_edges_from(edges)
    return G

def get_topological_sort(edges, subset_nodes=None):
    """
    Returns a valid topological sort order of the graph.
    If subset_nodes is provided, it returns the order for only those nodes and their prerequisites.
    """
    G = build_dag_from_edges(edges)
    
    # Check for cycles
    if not nx.is_directed_acyclic_graph(G):
        cycles = list(nx.simple_cycles(G))
        raise ValueError(f"Cycle detected in prerequisite graph: {cycles}")
        
    if subset_nodes:
        # We only care about the subset nodes and their ancestors (prerequisites)
        ancestors = set()
        for node in subset_nodes:
            if node in G:
                ancestors.add(node)
                ancestors.update(nx.ancestors(G, node))
        
        # Create subgraph with only relevant nodes
        sub_G = G.subgraph(ancestors)
        topo_order = list(nx.topological_sort(sub_G))
        return topo_order
    
    # Full graph sort
    topo_order = list(nx.topological_sort(G))
    return topo_order
